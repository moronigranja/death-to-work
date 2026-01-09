import { create } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";

export interface SpendingCategory {
  name: string;
  monthlySpend: number;
}

export interface RetirementResult {
  age: number;
  feedback: string;
}

interface RetirementStore {
  currentAge: number;
  currentSavings: number;
  monthlyIncome: number;
  categories: SpendingCategory[];
  retirementGoal: number;
  annualInflation: number;
  annualInterest: number;
  previousRetirementAge: number | null;
  updateCurrentAge: (age: number) => void;
  updateCurrentSavings: (savings: number) => void;
  updateMonthlyIncome: (income: number) => void;
  updateRetirementGoal: (goal: number) => void;
  updateAnnualInflation: (inflation: number) => void;
  updateAnnualInterest: (interest: number) => void;
  updateCategorySpend: (name: string, spend: number) => void;
  computeRetirementAge: () => RetirementResult;
  reset: () => void;
}

const defaultCategories: SpendingCategory[] = [
  { name: "Rent", monthlySpend: 1500 },
  { name: "Utilities", monthlySpend: 200 },
  { name: "Food", monthlySpend: 500 },
  { name: "Transportation", monthlySpend: 300 },
  { name: "Entertainment", monthlySpend: 200 },
  { name: "Other", monthlySpend: 300 },
];

const useRetirementStore = create<RetirementStore>()(
  persist(
    (set, get) => ({
      currentAge: 30,
      currentSavings: 0,
      monthlyIncome: 5000,
      categories: defaultCategories,
      retirementGoal: 1000000,
      annualInflation: 0.03,
      annualInterest: 0.07,
      previousRetirementAge: null,

      updateCurrentAge: (age) => set({ currentAge: age }),
      updateCurrentSavings: (savings) => set({ currentSavings: savings }),
      updateMonthlyIncome: (income) => set({ monthlyIncome: income }),
      updateRetirementGoal: (goal) => set({ retirementGoal: goal }),
      updateAnnualInflation: (inflation) => set({ annualInflation: inflation }),
      updateAnnualInterest: (interest) => set({ annualInterest: interest }),

      updateCategorySpend: (name, spend) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.name === name ? { ...c, monthlySpend: spend } : c
          ),
        })),

      computeRetirementAge: () => {
        const state = get();
        const totalSpend = state.categories.reduce(
          (sum, c) => sum + c.monthlySpend,
          0
        );
        const monthlySavings = state.monthlyIncome - totalSpend;

        let age: number;
        if (monthlySavings <= 0) {
          age = 999;
        } else {
          const monthlyInflation = state.annualInflation / 12;
          const monthlyInterest = state.annualInterest / 12;
          const r = (1 + monthlyInterest) / (1 + monthlyInflation) - 1;

          if (r <= 0) {
            age = 999;
          } else {
            const MAX_MONTHS = 999 * 12;
            let low = 0;
            let high = MAX_MONTHS;
            while (low < high) {
              const mid = Math.floor((low + high) / 2);
              const pow = Math.pow(1 + r, mid);
              const fv =
                state.currentSavings * pow + (monthlySavings * (pow - 1)) / r;
              if (fv >= state.retirementGoal) {
                high = mid;
              } else {
                low = mid + 1;
              }
            }
            const n = low;
            age = Math.floor(state.currentAge + n / 12);
          }
        }

        const prev = state.previousRetirementAge;
        let feedback = "";
        if (prev !== null) {
          feedback =
            age < prev
              ? "😊 Great improvement!"
              : age > prev
              ? "😞 Need to save more."
              : "";
        }

        set({ previousRetirementAge: age });
        return { age, feedback };
      },

      reset: () => {
        set({
          currentAge: 30,
          currentSavings: 0,
          monthlyIncome: 5000,
          categories: defaultCategories,
          retirementGoal: 1000000,
          annualInflation: 0.03,
          annualInterest: 0.07,
          previousRetirementAge: null,
        });
      },
    }),
    {
      name: "retirement-saver",
    } as PersistOptions<RetirementStore>
  )
);

export default useRetirementStore;
