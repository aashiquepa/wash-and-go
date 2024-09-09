import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';


export const useEmployeeStore = create(
  persist(
    (set) => ({
      details: [],
      initializing: true,
      nextId: 1,

      addEmployee: (newEmployee) => //add new user
        set((state) => {
          const employeeWithId = { ...newEmployee, id: state.nextId.toString() };
          return {
            details: [...state.details, employeeWithId],
            nextId: state.nextId + 1,
          };
        }),

      updateDetails: (newDetails) =>//update user
        set((state) => {
          const employeeIndex = state.details.findIndex(
            (emp) => emp.id === newDetails.id
          );
          if (employeeIndex !== -1) {
            const updatedDetails = [...state.details];
            updatedDetails[employeeIndex] = {
              ...state.details[employeeIndex],
              ...newDetails,
            };
            return { details: updatedDetails };
          } else {
            return { details: [...state.details, newDetails] };
          }
        }),

      deleteEmployee: (id) =>// delete user
        set((state) => ({
          details: state.details.filter((employee) => employee.id !== id),
        })),

      resetDetails: () => set({ details: [], nextId: 1 }),// reset user

      setInitializing: (bool) => set({ initializing: bool }),
    }),
    {
      name: 'USER_SESSION',// store in local storage as USER_SESSION
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state.setInitializing(false);
      },
    }
  )
);
