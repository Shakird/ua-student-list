import React from "react";
import { SortAscendingIcon, UsersIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function SearchBar() {
  const [students, setStudents] = React.useState(null);

  React.useEffect(() => {
    fetch("https://6181949532c9e2001780488b.mockapi.io/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // value of search field
  const [name, setName] = React.useState(null);

  // search result
  const [foundStudents, setFoundStudents] = React.useState(students);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = students.filter((student) => {
        return student.firstName
          .toLowerCase()
          .startsWith(keyword.toLowerCase());
        // I'm Using the toLowerCase() method to remove case sensitivity.
      });
      setFoundStudents(results);
    } else {
      setFoundStudents(students);
      // If search field is empty, the list will continue to show all students.
    }
    setName(keyword);
  };

  const filterCourse = (e) => {
    const course = e.target.value;

    if (course !== "") {
      const results2 = students.filter((student) => {
        return student.classes;
      });
      setFoundStudents(results2);
    } else {
      setFoundStudents(students);
      // If search field is empty, the list will continue to show all students.
    }
  };

  const comingSoon = () => {
    return alert("Feature Coming Soon!!");
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Students</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the students including their name, courses, and email.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={comingSoon}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add student
          </button>
        </div>
      </div>

      <div>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="search"
              name="name"
              value={name}
              onChange={filter}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
              placeholder="John Doe"
            />
          </div>
          <select
            type="button"
            defaultValue="All"
            onChange={filterCourse}
            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="All">
              <span>All Students</span>
            </option>
            <option value="Calculus">Students in Calculus</option>
            <option value="Geography">Students in Geography</option>
          </select>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        <a href="#" className="group inline-flex">
                          Name
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Courses
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <a href="#" className="group inline-flex">
                          Email
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {foundStudents && foundStudents.length > 0 ? (
                      foundStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {student.firstName} {student.lastName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {student.classes.join(", ")}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {student.email}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h1>No results found</h1>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
