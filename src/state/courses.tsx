import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const COURSES = gql`
	query GetCourses {
		courses {
			id
			course_code
			course_name
			course_desc
			course_level
			college_credits
			department
			hs_credits
			hs_department
			culturally_relevant
		}
	}
`;

export const useCourseList = () => {
	const [isCourseList, setCourseList] = useState({});
	const { loading, error, data } = useQuery(COURSES);

	if (!error) {
		setCourseList(data.courses);
	}
};
