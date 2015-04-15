Date.prototype.addHours = function(h){
	this.setHours(this.getHours()+h);
	return this;
}

var timeStamp = new Date().addHours(-6);

function getBanglaDateAndMonth() {
	var hours = timeStamp.getHours();
	var date = timeStamp.getDate();
	var month = timeStamp.getMonth(); 
	var year = timeStamp.getFullYear();		

	if (month >= 3) {
		if (month == 3 && date < 13)
			year = (year - 594);
		else
			year = (year - 593);
	} else {
		year = (year - 594);
	}

	switch (month) {
		case 0:
			if (date >= 1 && date <= 13) {
				date += 17;
				month = "পৌষ";
			} else {
				date -= 13;
				month = "মাঘ";
			}
		break;
		
		case 1:
			if (date >= 1 && date <= 12) {
				date += 18;
				month = month = "মাঘ";
			} else {
				date -= 12;
				month = "ফাল্গুন";
			}
		break;
		
		case 2:
			if (date >= 1 && date <= 14) {
				date += isLeapYear() ? 17 : 16;
				month = month = "ফাল্গুন";
			} else {
				date -= 14;
				month = "চৈত্র";
			}
		break;
		
		case 3:
			if (date >= 1 && date <= 13) {
				date += 17;
				month = month = "চৈত্র";
			} else {
				date -= 13;
				month = "বৈশাখ";
			}
		break;
		
		case 4:
			if (date >= 1 && date <= 14) {
				date += 17;
				month = "বৈশাখ";
			} else {
				date -= 14;
				month = "জ্যৈষ্ঠ";
			}
		break;
		
		case 5:
			if (date >= 1 && date <= 14) {
				date += 17;
				month = "জ্যৈষ্ঠ";
			} else {
				date -= 14;
				month = "আষাঢ়";
			}
		break;
		
		case 6:
			if (date >= 1 && date <= 15) {
				date += 16;
				month = "আষাঢ়";
			} else {
				date -= 15;
				month = "শ্রাবণ";
			}
		break;
		
		case 7:
			if (date >= 1 && date <= 15) {
				date +=  16;
				month = "শ্রাবণ";
			} else {
				date -=  15;
				month = "ভাদ্র";
			}
		break;
		
		case 8:
			if (date >= 1 && date <= 15) {
				date +=  16;
				month = "ভাদ্র";
			} else {
				date -=  15;
				month = "আশ্বিন";
			}
		break;
		
		case 9:
			if (date >= 1 && date <= 15) {
				date += 15;
				month = "আশ্বিন";
			} else {
				date -= 15;
				month = "কার্তিক";
			}
		break;
		
		case 10:
			if (date >= 1 && date <= 14) {
				date += 16;
				month = "কার্তিক";
			} else {
				date -= 14;
				month = "অগ্রহায়ণ";
			}
		break;
		
		case 11:
			if (date >= 1 && date <= 14) {
				date += 16;
				month = "অগ্রহায়ণ";
			} else {
				date -= 14;
				month = "পৌষ";
			}
		break;
		
	}
		
	return {"year" : year, "date" : date, "month" : month};
}

function isLeapYear() {
	var year = timeStamp.getFullYear();	
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

String.prototype.convertDigitToBangla = function() {
	var convertToBanglaDigit = {'1': '১', '2': '২', '3': '৩', '4' : '৪', '5' : '৫', '6' : '৬', '7' : '৭', '8' : '৮', '9' : '৯',  '0' : '০'};
	return this.replace(/[1234567890]/g, function(match) {
		return convertToBanglaDigit[match];
	});
};

document.getElementById("bangla-date").innerHTML = (getBanglaDateAndMonth().date.toString().convertDigitToBangla() + " " + getBanglaDateAndMonth().month + ", " + getBanglaDateAndMonth().year.toString().convertDigitToBangla());
