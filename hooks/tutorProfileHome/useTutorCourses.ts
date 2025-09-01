// Este hook se utiliza para obtener los cursos de un tutor

export function useTutorCourses(tutor: any) {
  const getDayText = (dayNum: number): string => {
    const days = ['Sáb','Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    return days[dayNum % 7] || 'N/A';
  };

  const formatTime = (timeStr: string): string => {
    try {
      const timePart = timeStr.split('.')[0];
      return timePart.substring(0, 5);
    } catch (e) {
      return timeStr;
    }
  };

  const getScheduleText = (horarios: any[]): string => {
    if (!horarios || horarios.length === 0) return 'Horario no disponible';
    return horarios.map(h =>
      `${getDayText(h.dia)} ${formatTime(h.hora_inicio)}-${formatTime(h.hora_fin)}`
    ).join(', ');
  };

  const courses = tutor?.cursos_detalle
    ? tutor.cursos_detalle.map(course => {
        const schedulesByDay: Record<string, string[]> = {};
        if (course.horarios) {
          course.horarios.forEach(h => {
            const day = getDayText(h.dia);
            if (!schedulesByDay[day]) schedulesByDay[day] = [];
            schedulesByDay[day].push(`${formatTime(h.hora_inicio)}-${formatTime(h.hora_fin)}`);
          });
        }
        const scheduleArray = Object.entries(schedulesByDay).map(([day, times]) => ({
          day,
          times: times as string[]
        }));
        return {
          id: course.curso_id,
          title: course.nombre,
          schedule: course.horarios ? getScheduleText(course.horarios) : 'Horario no disponible',
          scheduleArray,
          schedulesByDay,
          reviewsCount: course.resenas,
          price: course.precio_por_hora,
          totalTutorials: course.tutorias_impartidas
        };
      })
    : tutor?.cursos_impartidos?.map((curso: string, index: number) => ({
        id: index + 1,
        title: curso,
        schedule: 'Lun-Vie 15:00-17:00',
        scheduleArray: [{ day: 'Lun-Vie', times: ['15:00-17:00'] }],
        schedulesByDay: { 'Lun-Vie': ['15:00-17:00'] },
        reviewsCount: Math.floor(Math.random() * 10) + 1,
        price: 3000,
        totalTutorials: tutor.total_cursos_impartidos || 0,
      })) || [];

  return { courses };
}