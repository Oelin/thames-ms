import React, { useEffect } from 'react';
import styled from 'styled-components'
import API from '../../api'


function getCourseRecommendations(about) {
  return API.update('/recommend', { about })
}


// async function mostCommonSubject(achievements) {
//   let tab = {}
//   let list = []
//
//   achievements.forEach(({ Associations }) => list.push(...Associations));
//   list.forEach(subject => tab[subject] = ~~tab[subject] + 1)
//
//   return Object.entries(tab).map(([k, v]) => `${v}: ${k}`).sort().slice(-1)[0].split(': ')[1]
// }
//
//
// async function mostLikelySubject(achievements) {
//   const combinedText = achievements.map(({ About, Name }) => `${About} ${Name}`).join(' ')
//   console.log(combinedText)
//
//   const subjectPercentages = await API.get(`/topics/${encodeURIComponent(combinedText)}`)
//   console.log(subjectPercentages)
//
//   return 'maths'
// }
//

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

      let about = achievements.map(({ About }) => About).join(' ')
      let courses = await getCourseRecommendations(about)

      setCourses(courses)
      setPrevious(achievements)
    })()
  })

  return courses ? (
    <CourseList>
      {courses.map(({ name, link }) => <li><a href={ link }>{ name }</a></li>)}
    </CourseList>
  ) : (
    <div></div>
  )
}
