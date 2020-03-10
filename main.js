let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function loopDays() {
		document.getElementById('dList').innerHTML = "";
		let x = parseInt(document.getElementById('dates').value);
		let i;
		for (i=0; i < x; i++) {
				createDays(i)
		}
}

function createDays(n) {
		let start = parseInt(document.getElementById('start').value);
		let end = parseInt(document.getElementById('end').value)
		let year = String(getRndInt(start, end)).padStart(4,'0');
		let month = String(getRndInt(1,12)).padStart(2,'0');
		let day = String(getRndInt(1,29)).padStart(2,'0');
		
		span = document.createElement('span');
		span.id = 'date'+n;
		span.innerHTML = formatDate(year, month, day);
		d = new Date(year+"-"+month+"-"+day);
		br = document.createElement('br');
		btn = document.createElement('button');
		btn.setAttribute("onclick","showDay('btn"+n+"','out"+n+"')");
		btn.innerHTML = 'Show Day';
		btn.id = 'btn'+n;
		span2 = document.createElement('span');
		span2.id = 'out'+n;
		span2.innerHTML = " "+days[d.getUTCDay()];
		span2.style.visibility = 'hidden';
		
		let dList = document.getElementById('dList');
		dList.appendChild(span)
		dList.appendChild(btn);
		dList.appendChild(span2);
		dList.appendChild(br);
}	
		
function showDay(y, z) {
		let button = document.getElementById(y);
		let output = document.getElementById(z);
		
		button.remove();
		output.style.visibility = 'visible'	
}

function getRndInt(min, max) {
		return Math.floor(Math.random()*(max-min+1))+min;
}

function printDate() {
		let cents = [2, 0, 5, 3]
		let d = new Date(document.getElementById("date").value);
		let year = d.getUTCFullYear();
		let century = Math.floor(year/100);
		let ltd = year%100;
		
		let centuryOff = cents[century%4]
		let ltdOff = (Math.floor(ltd/12)+(ltd%12)+Math.floor((ltd%12)/4))%7
		let lYear;
		
		if (year%4 == 0 && year%100 != 0 || year%400 == 0) {
				lYear = 'Yes'
		} else {
				lYear = 'No'
		}
		
		document.getElementById("line1").innerHTML="Century Offset for "+century+"00: "+centuryOff;
		document.getElementById("line2").innerHTML="LDT Offset for '"+ltd.toString().padStart(2,"0")+": "+ltdOff;
		document.getElementById("line3").innerHTML="Doomsday for "+year+": "+(centuryOff+ltdOff)%7;
		document.getElementById("line4").innerHTML=year+' is leap year: '+lYear
		document.getElementById("line5").innerHTML="Day of week for "+document.getElementById("date").value+': '+days[d.getUTCDay()];
}


function getLtdOff() {
		let ltd = parseInt(document.getElementById("ltd").value);
		let ltdOut = document.getElementById("ltdOut");
		let a = Math.floor(ltd/12)
		let b = ltd%12
		let c = Math.floor(b/4)
		
		ltdOut.innerHTML = (a+b+c)%7
}

function formatDate(year, month, day) {
		let sYear = String(year).padStart(4,"0");
		let sMonth = String(month).padStart(2,"0");
		let sDay = String(day).padStart(2,"0");
		let formValue = document.getElementById("format").value;
		if (formValue=="US") {
				return sMonth+"/"+sDay+"/"+sYear
		}
		if (formValue=="UK") {
				return sDay+"/"+sMonth+"/"+sYear;
		}
		if (formValue=="ISO") {
				return sYear+"-"+sMonth+"-"+sDay;
		}
		if (formValue=="USfull") {
				return months[month-1]+" "+sDay+" "+sYear;
		}
		if (formValue=="UKfull") {
				return sDay+" "+months[month-1]+" "+sYear;
		}
}
