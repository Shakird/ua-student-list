import React from "react";
import SearchBar from "./searchBar";

export default function HomePage() {
  return (
    <div class="flex flex-col h-full">
      <div className="mx-auto mt-4">
        <SearchBar />
      </div>

      {/* Future iteration will separate the list into its on component */}
      {/* <StudentList /> */}
    </div>
  );
}
