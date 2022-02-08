// grant access list

const accessList = {
    admin: [
		'/dashboard',
		'/student',
		'/class',
		'/payment',
		'/invoice/[id]',
		'/invoice',
		'/test'
	],
	student:[
		'/dashboard',
		'/invoice'
	]
}

export default accessList