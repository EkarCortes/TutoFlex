import { useState, useEffect } from "react";

// Este hook se utiliza para gestionar las pestañas de "Cursos" y "Reseñas"

export function useTutorTabs(coursesLength: number, initialCoursesToShow = 3) {
  const [activeTab, setActiveTab] = useState<'Cursos' | 'Reseñas'>('Cursos');
  const [visibleCourses, setVisibleCourses] = useState(initialCoursesToShow);

  useEffect(() => {
    setVisibleCourses(initialCoursesToShow);
  }, [activeTab, initialCoursesToShow]);

  const loadMoreCourses = () => {
    setVisibleCourses((prev) => prev + 3);
  };

  return {
    activeTab,
    setActiveTab,
    visibleCourses,
    loadMoreCourses,
  };
}