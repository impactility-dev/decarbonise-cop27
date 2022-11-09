import Typography from '@mui/material/Typography';

export const questions = [
	{
		"question": "What does offsetting your carbon emissions mean?",
		"answer": () => (
			<>
				<Typography paragraph>
					A carbon offset is a way to compensate for your emissions by funding an equivalent carbon dioxide saving elsewhere.
				</Typography>
			</>
		)
	},
	{
		"question": "Why should you offset your carbon emissions for your flight to COP 27?",
		"answer": () => (
			<>
				<Typography paragraph>
					By offsetting your carbon emissions, you will take a step towards being carbon neutral. 
					Environmentally conscious persons attending COP 27 can lead by example for others to follow.
				</Typography>
			</>
		)
	},
	{
		"question": "How does Impact Club estimate the carbon emissions of a flight?",
		"answer": () => (
			<>
				<Typography paragraph>
					Impact Club uses the carbon emission estimation model developed 
					by <a rel="noreferrer" href="https://co2.myclimate.org/en/flight_calculators/new" target="_blank">myclimate</a>. 
					Their model is well established and ranks amongst the top in terms of accuracy.
				</Typography>
			</>
		)
	},
	{
		"question": "Why does my travel class affect my flight's carbon emissions?",
		"answer": () => (
			<>
				<Typography paragraph>
					Your travel class influences the space available per passenger. 
					A larger percentage of higher class seating results in fewer passengers fitting on the plane. 
					This results in the flight emission being divided by a lesser number of passengers which in turn 
					increases the emission per passenger.  Also, higher class tickets have a larger baggage allowance 
					and more elaborate meals.
				</Typography>
			</>
		)
	},
	{
		"question": "What does tCO2 stand for?",
		"answer": () => (
			<>
				<Typography paragraph>
					tCO2 stands for “tonnes of carbon dioxide” which indicates the amount of carbon dioxide that 
					needs to be compensated so that the flight has zero impact on the climate.
				</Typography>
			</>
		)
	},
	{
		"question": "How can you offset your COP 27 flights using Impact Club?",
		"answer": () => (
			<>
				<Typography paragraph>
					Step 1: You can start by clicking <a rel="noreferrer" href="http://cop27.impact.club/" target="_blank">here</a>.
				</Typography>
				<Typography paragraph>
					Step 2: Select the airport, travel class and number of passengers you would like to offset for.
				</Typography>
				<Typography paragraph>
					Step 3: Connect your web3 wallet. The most widely used wallet is Metamask.
					<br />To set up your Metamask wallet you can follow the steps <a rel="noreferrer" href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask" target="_blank">here</a>.
				</Typography>
				<Typography paragraph>
					Step 4: Choose between paying or pledging to offset your emissions.
				</Typography>
				<Typography paragraph>
					Step 5: Mint your Decarbonise COP 27 POAP!
				</Typography>
			</>
		)
	},
	{
		"question": "What is the difference between paying and pledging to offset your carbon emissions?",
		"answer": () => (
			<>
				<Typography paragraph>
					Paying, as the name suggests, allows you to pay for the offsets yourself while pledging lets 
					a sponsoring organisation pay on your behalf.
				</Typography>
			</>
		)
	},
	{
		"question": "Who are our partners?",
		"answer": () => (
			<>
				<Typography paragraph>
					We are currently looking for partnerships.
				</Typography>
			</>
		)
	},
	{
		"question": "Where can I find the smart contract source code?",
		"answer": () => (
			<>
				<Typography paragraph>
					You can find the source code on <a rel="noreferrer" href="https://github.com/impactility-dev/decarbonise-cop27" target="_blank">GitHub Repository</a>.
				</Typography>
			</>
		)
	},
	{
		"question": "Does Impact Club charge any fees?",
		"answer": () => (
			<>
				<Typography paragraph>
					No, Impact Club does not charge any fees.
				</Typography>
			</>
		)
	},
	{
		"question": "Which tokens can I send to the Community Offset Pool?",
		"answer": () => (
			<>
				<Typography paragraph>
					You can send MATIC or NCT tokens.
				</Typography>
			</>
		)
	},
	{
		"question": "What happens to the tokens I send?",
		"answer": () => (
			<>
				<Typography paragraph>
					If you send a MATIC, it is first swapped to an NCT and it is sent to the Community Offset Pool, 
					a multisig wallet under the control of the Impact Club team.
				</Typography>
			</>
		)
	},
	{
		"question": "What is NCT?",
		"answer": () => (
			<>
				<Typography paragraph>
				Nature Carbon Tonne (NCT) is a premium carbon pool that restricts TCO2 qualification 
				to nature-based projects such as forestry and regenerative agriculture. 
				An NCT represents one tonne of carbon in any of the nature-based carbon projects in the Nature Carbon Pool. 
				This allows for a liquid carbon market by making carbon certificates fungible amongst different projects. 
				After the carbon certificates are retired, the smart contract chooses a specific project to retire from. 
				You can read more about it <a rel="noreferrer" href="https://blog.toucan.earth/announcing-nct-nature-carbon-tonne/" target="_blank">here</a>.
				</Typography>
			</>
		)
	},
	{
		"question": "Can I choose a carbon credit project to support?",
		"answer": () => (
			<>
				<Typography paragraph>
				Yes! After COP 27, a list of projects to support will be released.  
				Participants who have paid or pledged to offset their emissions 
				and hold the Decarbonise COP 27 POAP will be allowed to vote for which project to support.
				</Typography>
			</>
		)
	},
	{
		"question": "What is a POAP?",
		"answer": () => (
			<>
				<Typography paragraph>
				A Proof of Attendance Protocol (POAP) is a unique NFT given to people to commemorate 
				and prove they attended an event (virtual or physical). Over time, people can 
				accrue a collection of POAPs to document their physical life experiences and 
				activity through cyberspace.  The Decarbonise COP 27 POAP will function as a voting 
				token for the choice of carbon offset project when it goes to vote.
				</Typography>
			</>
		)
	},
	{
		"question": "What is Impact Club?",
		"answer": () => (
			<>
				<Typography paragraph>
					Impact Club is an attempt to create an ecosystem by encouraging individuals 
					and organisations to acknowledge impact initiatives, foster collaboration and 
					incentives stakeholders to implement regenerative principles using Web3 technologies.
				</Typography>
				<Typography paragraph>
					Impact Club is backed by a wave of change makers who demand positive change 
					as a growing part of your everyday lives.
				</Typography>
			</>
		)
	},
	{
		"question": "Who is Impactility?",
		"answer": () => (
			<>
				<Typography paragraph>
					Impactility is a passion-driven cleantech company that leverages emerging technologies 
					to generate measurable sustainability impact.
				</Typography>
				<Typography paragraph>
					Our cutting-edge technology enables positive social, environmental and economical 
					sustainability impact, without any compromises.
				</Typography>
				<Typography paragraph>
					We are accelerating tomorrow’s sustainability impact today.
				</Typography>
				<Typography paragraph>
					Read more about us on our <a rel="noreferrer" href="https://impactility.com/" target="_blank">website</a>.
				</Typography>
			</>
		)
	},
	{
		"question": "How can you support us?",
		"answer": () => (
			<>
				<Typography paragraph>
					You can support us by following <a rel="noreferrer" href="https://twitter.com/ImpactClubWeb3" target="_blank">Impact Club</a> and <a rel="noreferrer" href="https://twitter.com/impactilitytech" target="_blank">Impactility</a> on Twitter.
				</Typography>
			</>
		)
	},
	{
		"question": "How can you contact Impact Club?",
		"answer": () => (
			<>
				<Typography paragraph>
					Feel free to drop us a message on <a rel="noreferrer" href="https://twitter.com/ImpactClubWeb3" target="_blank">Twitter</a> or email us on impactclub@impact.club
				</Typography>
			</>
		)
	},
]