import React from 'react'
import { Panel, ServerSideTable } from '../../src/components/templates'

const Search = () => {
	return (
		<div>Search</div>
	)
}

Search.getLayout = page => <Panel>{page}</Panel>

export default Search