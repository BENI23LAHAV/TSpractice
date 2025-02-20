/**---------------Practies------------------ */
//Defind a Person interface

interface Person {
  firstName: string;
  lastName: string;
}

//Defind a Student interface that extends the Person interface and added a class
interface Student extends Person {
  class: "A" | "B" | "C";
}

//Defind a Test interface that has a student and a grade
interface Test {
  student: Student;
  grade: number;
  minGrade: number;
}
//Defind a readonly student
const student: Readonly<Student> = {
  firstName: "Beni",
  lastName: "Lahav",
  class: "A",
};
//
const updateTest = (test: Partial<Test>) => {
  test.grade = 100;
  test.student = student;
};
//
const Students: Record<string, Student> = {
  beni: student,
};

//Definding a fullName by picking the first&last name
type FullNameType = Pick<Student, "firstName" & "lastName">;
type FullNameType2 = Pick<Student, "firstName" | "lastName">;

const fullName: FullNameType | FullNameType2 = {
  firstName: "Beni",
  lastName: "Lahav",
};
//Definding a fullName by omiting the class variable
const fullNameOmit: Omit<Student, "class"> = {
  firstName: "Beni",
  lastName: "Lahav",
};

const Status = {
  notStarted: "notStarted",
  inProgress: "inProgress",
  completed: "completed",
} as const;

type Status = keyof typeof Status;

// type Setters = {
//   [K in keyof typeof Status]: (value: Status) => void;
// };

function initialize(status: Status) {}

initialize(Status.notStarted); // the output is notStarted as a string
initialize("completed"); // the output is completed as a string
initialize(Status["notStarted"]); // the output is notStarted as a string

type Product = {
  name: string;
  price: number;
  inStock: boolean;
};
type ProductSetters = {
  [K in keyof Product as `Set${Capitalize<K>}`]: (value: Product[K]) => void;
};

const setters: ProductSetters = {
  SetName(name: string) {},
  SetPrice(price: number) {},

  SetInStock(inStock: boolean) {},
};
