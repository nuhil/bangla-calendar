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
	var isLeapYear = ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	
	var bn_months = ["পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র", "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ",  "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ"];
	var middate = [13,12,14,13,14,14,15,15,15,15,14,14];
	var numdays = [30,30,30,30,31,31,31,31,31,30,30,30];		
	var lipyearindex = 2;
	
	new_year = month > 3 || (month == 3 && date > 13) ? (year - 593):(year - 594);		
	
	new_date = date - middate[month];
	
	if (date <= middate[month]) {
		new_date += ((month == lipyearindex) && isLeapYear) ? numdays[month]+1 : numdays[month];
	}
	new_month = date <= middate[month] ? bn_months[month] : bn_months[(month+1)%12];
			
	return {"year" : new_year, "date" : new_date, "month" : new_month};
}

String.prototype.convertDigitToBangla = function() {
	var convertToBanglaDigit = {'1': '১', '2': '২', '3': '৩', '4' : '৪', '5' : '৫', '6' : '৬', '7' : '৭', '8' : '৮', '9' : '৯',  '0' : '০'};

	return this.replace(/[1234567890]/g, function(match) {
		return convertToBanglaDigit[match];
	});
};

document.getElementById("bangla-date").innerHTML = (getBanglaDateAndMonth().date.toString().convertDigitToBangla() + " " + getBanglaDateAndMonth().month + ", " + getBanglaDateAndMonth().year.toString().convertDigitToBangla());
