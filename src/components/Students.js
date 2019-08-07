import React from 'react';
import axios from 'axios';
import Student from './Student'
import filterStudents from './helpers'

class Students extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			students: [],
			searchName: '',
			searchtag: '',
		};
	}

	componentDidMount(){
		axios.get('https://www.hatchways.io/api/assessment/students')
		.then(res => {
			this.setState({
				students: res.data.students
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

	getAverage = (array) => {
		let total = 0, average
		array.forEach(num => {
			total += Number(num)
		})
		average = (total / array.length)
		return `${average}%`
	}

	addTag = (e, id, tag, resetText) => {
		e.preventDefault()
		const {students} = this.state

		let newStudents = students.map((student, i) => {
			if (student.id === id){
				!student.tags && (student.tags = {})
				student.tags[tag] = tag
			}
			return student
		})

		this.setState({
			students: newStudents,
		}, resetText())

	}

	render() {

		const {students, searchName, searchtag} = this.state

		let current = filterStudents(students, searchName, searchtag)

		return (
			<div>

				<input
					type='text'
					placeholder="Search by Name"
					value={searchName}
					name='searchName'
					onChange={this.handleChange}
					className="search"
				/>
				<hr/>

				<input
					type='text'
					placeholder="Search by Tag"
					value={searchtag}
					name='searchtag'
					onChange={this.handleChange}
					className="search"
				/>
				<hr/>

				{current.map((student, i) => {
					return (
						<div key={i}>
							<Student
								student={student}
								getAverage={this.getAverage}
								addTag={this.addTag}
							/>
							<hr className="student-hr"/>
						</div>
					)
				})}

			</div>			
		)
	}
}

export default Students;
