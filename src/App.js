import logo from "./logo.svg";
import "./App.css";
import pix from "./1.png";
import { io } from "socket.io-client";
import styled from "styled-components";
import axios from "axios";
import React from "react";

function App() {
	const socket = io("http://localhost:5000");

	const [data, setData] = React.useState([]);
	const [text, setText] = React.useState("");

	const postData = async () => {
		await axios.post("http://localhost:5000/api", { name: text });
		setText("");
	};

	const getData = async () => {
		await axios.get("http://localhost:5000/api").then((res) => {
			console.log(res);
			setData(res.data);
		});
	};

	React.useEffect(() => {
		socket.on("newEntry", (newData) => {
			setData([...data, newData]);
			getData();
		});
		getData();
	}, []);

	return (
		<div className='App'>
			<Container>
				<Wrapper>
					<FormCard>
						<Text>Enter a Card Name</Text>
						<Input
							value={text}
							onChange={(e) => {
								setText(e.target.value);
							}}
							placeholder='Enter Name'
						/>
						<Button onClick={postData}>Add Name</Button>
					</FormCard>
					<Card>
						{data.map((props) => (
							<MainCard key={props._id}>
								<Image src={pix} />
								<Name>{props.name}</Name>
								<LikeHolder>
									<Like>like</Like>
									<LikeCount></LikeCount>
								</LikeHolder>
							</MainCard>
						))}
					</Card>
				</Wrapper>
			</Container>
		</div>
	);
}

export default App;

const LikeCount = styled.div`
	font-size: 10px;
	font-weight: 700;
`;

const Like = styled.div`
	background-color: darkorange;
	color: white;
	padding: 5px 20px;
	text-transform: uppercase;
	font-weight: 700;
	transition: all 350ms;
	margin: 0 10px;
	border-radius: 30px;
	:hover {
		cursor: pointer;
		transform: scale(1.01);
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
`;

const LikeHolder = styled.div`
	display: flex;
	align-items: center;
`;

const Name = styled.div`
	font-weight: 900;
	font-size: 20px;
	display: flex;
	justify-content: center;
`;

const Image = styled.img`
	background-color: darkorange;
	height: 300px;
	width: 100%;
	object-fit: cover;
`;

const MainCard = styled.div`
	margin: 8px;
	width: 350px;
	height: 230px;
	border-radius: 5px;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
		rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const Card = styled.div`
	margin-top: 50px;
	width: 100%;
	flex-wrap: wrap;
	display: flex;
	justify-content: center;
`;

const Button = styled.div`
	background-color: darkorange;
	color: white;
	padding: 10px 40px;
	text-transform: uppercase;
	font-weight: 700;
	transition: all 350ms;
	:hover {
		cursor: pointer;
		transform: scale(1.02);
	}
`;

const Input = styled.input`
	width: 300px;
	height: 30px;
	padding: 5px;
	margin: 5px;
`;
const Text = styled.div``;

const FormCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Wrapper = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
