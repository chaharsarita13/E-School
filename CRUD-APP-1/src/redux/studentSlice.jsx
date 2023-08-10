import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "students",
    initialState: {
        students: []
    },
    reducers: {
        // getStudent : (state, action) => {
        //     state.students = action.payload.map(student => {
        //         return {id: student._id, name: student.name, email: student.email, age: student.age}
        //     })
        // },
        // addStudent : (state, action) => {
        //     state.students.push(action.payload)
        // },
        // updateStudent: (state, action) => {
        //     const index = state.students.findIndex(x => x.id === action.payload.id)
        //     state.students[index] = {
        //         id: action.payload.id,
        //         name: action.payload.name,
        //         email: action.payload.email,
        //         age: action.payload.age,
        //     }
        // },
        // deleteStudent: (state, action) => {
        //     const id = action.payload.id;
        //     state.students = state.students.filter(u => u.id !== id)
        // }
    }
})

export const {getStudent, addStudent, updateStudent, deleteStudent} = studentSlice.actions;
export default studentSlice.reducer;