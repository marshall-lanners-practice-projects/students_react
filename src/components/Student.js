import React from 'react';
import Grade from './Grade';
import Tag from './Tag'

class Student extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showScores: false,
			symbol: ['+', '_'],
			text: ""
		};
	}

	componentDidMount(){}

	showshowScores = () => {
		this.setState({
			showScores: !this.state.showScores
		})
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	resetText = () => {
 		this.setState({text: ''})
 	}

	render() {

		const {showScores, symbol, text} = this.state
		const {student, getAverage, addTag} = this.props
		let average = getAverage(student.grades)

		return (
			<div  className="student">
				<img src={student.pic} alt="profile" className="studentImage"/>
				<div>

					<h2 className="student-name">{student.firstName} {student.lastName}</h2>
					<ul className="student-info">
						<li>Email {student.email}</li>
						<li>Company {student.company}</li>
						<li>Skill {student.skill}</li>
						<li>Average {average}</li>
					</ul>

					<ul className="student-info spacingTop">
						{showScores && student.grades.map((grade, i) => {
							return (
								<Grade score={grade} id={i + 1} key={i}/>
							)
						})}
					</ul>

					{showScores && student.tags && Object.keys(student.tags).map((tag, i) => {
						return <Tag tag={tag} key={i} className="tag"/>
					})}


					{showScores && 
						<form 
							onSubmit={(e) => {addTag(e, student.id, text, this.resetText)}}
							className="tagForm"
						>
							<input 
									type='text'
									placeholder="Add a Tag"
									value={text}
									name='text'
									onChange={this.handleChange}
									className="search"
								>
							</input>
							<hr/>
						</form>
					}

				</div>
				<div 
					className="viewScores" 
					onClick={this.showshowScores}>
					{showScores ? (symbol[1]) : symbol[0]}
				</div>
			</div>
		)
	}
}

export default Student;
