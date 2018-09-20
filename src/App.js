import React, { Component } from 'react';
import './App.css';

const API = 'https://api.github.com/repositories/';
const HUM = '147185926';
const CAT = 'filer';
const URL = API + HUM + '/contents/' + CAT;

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			sanger: [],
			isLoading: false,
			error: null,
		};
	}

	componentDidMount() {
		this.setState({ isLoading: true });

		fetch(URL)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something went wrong ...');
				}
			})
			.then(data => this.setState({ sanger: data, isLoading: false }))
			.catch(error => this.setState({ error, isLoading: false }));
	}

	render() {
		const { sanger, isLoading, error } = this.state;

		if (error) {
			return <p>{error.message}</p>;
		}

		if (isLoading) {
			return <p>Loading ...</p>;
		}

		return (
			<div className="limit">
				<h1>Nedlasting av filer fra GitHub</h1>
				<p className="ingress">
					Klikk for å laste ned. Hvis filen lastes ned som tekst i nytt vindu,
					trykk Ctrl-S (Windows) eller Cmd-S (Mac)
				</p>
				<ul className="sangliste">
					{sanger.map((sang, index) =>
						<li key={sang.sha} className="sang">
							<a href={sang.download_url} download={sang.name} target="_blank">
								{index + 1}{'. '} {sang.name}
							</a>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default App;
