import React, { useEffect } from 'react';
import styled from 'styled-components'
import API from '../../api'


function getCourseRecommendations(about) {
  return API.update('/recommend', { about })
}


const CourseList = styled.ul`
  li {
    text-transform: Capitalize;
    line-height: 2
  }
`


export default ({ achievements  }) => {
  const [ courses, setCourses ] = React.useState(null)
  const [ previous, setPrevious ] = React.useState(achievements)

  useEffect(() => {
    (!courses || (achievements != previous)) && (async () => {

      let about = achievements.map(({ Name, About, Associations }) => `${About} ${Associations?.join(' ')} ${Name}`).join(' ')
      let courses = await getCourseRecommendations(about)
      console.log('here here here', courses)

      setCourses(courses)
      setPrevious(achievements)
    })()
  })


  return courses ? (
    <CourseList>
      {courses.map(({ name, link }) => <li><a href={link}>{name.slice(0, 30)}...</a></li>)}
    </CourseList>
  ) : (
    <div></div>
  )
}
