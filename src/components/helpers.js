
let filterNames = (students, searchName) => {
	let len = searchName.length
	let filterByName = students.filter(student => {
		return (
			student.lastName.substring(0, len).toLocaleLowerCase() === searchName.toLocaleLowerCase() ||
			student.firstName.substring(0, len).toLocaleLowerCase() === searchName.toLocaleLowerCase()
		)
	})
	return filterByName
}

let filterTag = (students, searchtag) => {
	let len = searchtag.length
	let sub = searchtag.substring(0, len)
	let filterBytag = students.filter(student => {
		let bool = false
		if (student.tags){
			for (let i in student.tags){
				if (student.tags[i].substring(0, len) === sub){
					bool = true 
					break
				}
			}
		}
		return bool
	})
	return filterBytag
}


let filterStudents = (students, searchName, searchtag) => {

	let noFilter = searchName.length === 0 && searchtag.length === 0
	let nameNTag = searchName.length > 0 && searchtag.length > 0
	let onlyName = searchName.length > 0 
	let onlyTag = searchtag.length > 0

	if (noFilter){return students}

	if (nameNTag){
		let current
		current = filterNames(students, searchName)
		current = filterTag(current, searchtag)
		return current
	}

	if(onlyName){return filterNames(students, searchName)}

	if(onlyTag){return filterTag(students, searchtag)}
}

export default filterStudents





