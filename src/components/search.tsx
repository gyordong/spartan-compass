"use client";

import { useState, useMemo, useCallback } from "react";
import { CourseResult } from "@/app/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Search({ result }: { result: CourseResult[] }) {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedCourseNumber, setSelectedCourseNumber] = useState<
    number | null
  >(null);

  const router = useRouter();

  const subjects = useMemo(() => {
    return Array.from(new Set(result.map((course) => course.subject)));
  }, [result]);

  const courseNumbers = useMemo(() => {
    return Array.from(
      new Set(
        result
          .filter(
            (course) => !selectedSubject || course.subject === selectedSubject
          )
          .map((course) => course.courseNumber)
      )
    );
  }, [result, selectedSubject]);

  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
    setSelectedCourseNumber(null);
  }, []);

  const handleSubmit = useCallback(() => {
    // to handle our search, we'll redirect to the course page with the corresponding id
    if (selectedSubject && selectedCourseNumber) {
      const selectedCourse = result.find(
        (course) =>
          course.subject === selectedSubject &&
          course.courseNumber === selectedCourseNumber
      );
      if (selectedCourse) {
        router.push(`/courses/${selectedCourse.id}`);
      }
    }
  }, [selectedSubject, selectedCourseNumber, result, router]);

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-row items-center space-x-4">
        <Select onValueChange={handleSubjectChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Subjects</SelectLabel>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setSelectedCourseNumber(Number(value))}
          disabled={!selectedSubject}
          value={selectedCourseNumber?.toString() || ""}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a course number" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course Numbers</SelectLabel>
              {courseNumbers.map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handleSubmit}
          disabled={!selectedSubject || !selectedCourseNumber}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
