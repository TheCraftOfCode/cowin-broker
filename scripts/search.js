const search = ()=>{
	
	document.getElementById(`search`).remove();
	document.getElementById(`site-info`).remove();
	today = new Date();
	flag=0;urlDate=`${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`
	pincodeVal=pincode.value;
	console.log(`Value: ${pincode.value}`);
	document.getElementById(`pincode`).remove();
	const url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincodeVal}&date=${urlDate}`;
	let searchCount=0;
	
	 
	const request = async ()=>{
		
		const response = await fetch(url);
		const data = await response.json();
		if(!data || !data.centers) {
			document.getElementById(`output`).innerHTML=`Error Input. Enter a 6 digit Pincode.`;
			return;
		}
			
		const divArray = data.centers.forEach((center)=>{
				if(data.centers.length>0){
					document.getElementById(`output`).innerHTML=``;
				}
				const newDiv = document.createElement('div');
				newDiv.className = "sessions";
				newDiv.appendChild(document.createTextNode(`Pincode: ${center.pincode}`));
				newDiv.appendChild(document.createElement("br"));
				newDiv.appendChild(document.createTextNode(`Center ID: ${center.center_id}`));
				newDiv.appendChild(document.createElement("br"));
				newDiv.appendChild(document.createTextNode(`Center Name: ${center.name}`));
				newDiv.appendChild(document.createElement("br"));
				newDiv.appendChild(document.createTextNode(`Fee Type: ${center.fee_type}`));
				newDiv.appendChild(document.createElement("br"));
				newDiv.appendChild(document.createTextNode(`Time Available:  ${center.from}-${center.to}`));
				newDiv.appendChild(document.createElement("br"));
				const sessionhead = document.createElement('div');
				sessionhead.className="sessionhead";
				newDiv.appendChild(document.createElement("br"));
				sessionhead.appendChild(document.createTextNode("Sessions Info:"));
				
				newDiv.appendChild(sessionhead);
				newDiv.appendChild(document.createElement("hr"));
				center.sessions.forEach((session)=>{
					
					newDiv.appendChild(document.createTextNode(`Date: ${session.date}`));
					newDiv.appendChild(document.createElement("br"));
					newDiv.appendChild(document.createTextNode(`Available Capacity: ${session.available_capacity}`));
					newDiv.appendChild(document.createElement("br"));
					newDiv.appendChild(document.createTextNode(`Vaccine: ${session.vaccine}`));
					newDiv.appendChild(document.createElement("br"));
					newDiv.appendChild(document.createTextNode(`Available Dose 1 Cap: ${session.available_capacity_dose1}`));
					newDiv.appendChild(document.createElement("br"));
					newDiv.appendChild(document.createTextNode(`Available Dose 2 Cap: ${session.available_capacity_dose2}`));
					newDiv.appendChild(document.createElement("br"));
					const slothead = document.createElement('div');
					slothead.className="slothead";
					newDiv.appendChild(document.createElement("br"));
					slothead.appendChild(document.createTextNode("Slots for Session:"))
					newDiv.appendChild(slothead);
					const slots = session.slots.forEach((slot)=>{
						newDiv.appendChild(document.createTextNode(slot));
						newDiv.appendChild(document.createElement("br"));
					})
					newDiv.appendChild(document.createElement("hr"));
				})
				if(center.vaccine_fees)
				{const vaccineCostHead = document.createElement("div");
				vaccineCostHead.className=("vaccine-cost-head");
				center.vaccine_fees.forEach((vaccine)=>{
					newDiv.appendChild(document.createTextNode(`Vaccine: ${vaccine.vaccine} - Cost: ₹${vaccine.fee}`));					newDiv.appendChild(document.createElement("br"));
				})
				newDiv.appendChild(document.createElement("hr"));}
				
				document.getElementById("sessions-container").insertBefore(newDiv,document.getElementById("output"));
				const cutter = document.createElement("div");
				cutter.className = "cutter";
				cutter.appendChild(document.createElement("br"))
				document.getElementById("sessions-container").insertBefore(cutter ,document.getElementById("output"));
			});
		
		if (data.centers.length>0){
			flag=1;
			console.log(`End`)
			return;
		}
	}
	function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
	
	async function run(){
		while(flag===0){
		document.getElementById(`output`).innerHTML=` Currentlty Not Available. Trying to get info for ${pincodeVal}...`;
		document.getElementById(`search-count`).innerHTML=` Try Counts: ${++searchCount}`;
		request();
			await sleep(10000);
		}
		
	}
	
	
	run();
	return;
}