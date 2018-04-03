/* 
	Bangla Date Calculation Algorithm Explanation:
	Two key points need to be noted before dive in:
		- Bangla Year always starts at 14th April and that is the 'Pahela Boishakh'
		- If a Gregorian/English year is Leap year the 'Falgun' Month will be 31 days,
		otherwise it will always be 30 days. 
		- From a given Gregorian year X, we can find the bangla year from the formula 
			BanglaYear = X - 593
		(the logic explains later)

	So, if a Gregorian Date is given we first need to find out if it is before the 14th April of
	the current Gregorian Year. Let's say the given date is 01-05-2018. So, this is after the 
	14th April of current Gregorian year 2018. So, to calculate what Bangla Year is this we can
	easily use the formula:
	BanglaYear = X - 593 (where, X = 2018)
	But if the given date is 01-04-2018, that means before the 14th April, then we can calculate 
	the Banglayear by considering X = 2017. 
	Now, after calculating the Starting Gregorian Year, let's say it's X, for the Bangla Year we need to 
	find how many total days passed from beginning of that banglaYear. It can be calculated easily from 
	the difference between the given Gregorian date and the 13th April of the X, let's call it 'diff'.
	As we know the Total days of each Bangla Months and which is following: 
		totalMonthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]
	we can now easily traverse through this list to find where the 'diff' resides and as a result
	we will find the Bangla Month and the Day.
*/

var banglaMonths = [ 'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র' ];
var weekDays = [ 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার' ];
var banglaSeasons = ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'];
var totalMonthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];

Date.prototype.addHours = function(h) {
	this.setHours(this.getHours() + h);
	return this;
};

function isLeapYear(year) {
	return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
	var MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

	return Math.floor((utc2 - utc1) / MILLISECONDS_PER_DAY);
}

function getBanglaDateAndMonth(givenDate) {
	givenDate = givenDate || new Date().addHours(-6);

	//Year, Date, Month for Gregorian/English Calendar
	var gregDate = givenDate.getDate(),
		gregMonth = givenDate.getMonth(),
		gregYear = givenDate.getFullYear(),
		gregDay = givenDate.getDay();

	if (isLeapYear(gregYear)) {
		totalMonthDays[10] = 31; //If the given Gregorian Year is a LeapYear then, the Falgun month enclosed in the gregorian year will be 31 days
	}

	// If the given date is smaller than 14th April of current Gregorian Year
	if (gregMonth < 3 || (gregMonth === 3 && gregDate < 14)) {
		// 3 is the index of 'April'
		gregYear = gregYear - 1;
	}

	var epoch = new Date(gregYear + '-04-13');
	var banglaYear = gregYear - 593;

	var dayRemaining = dateDiffInDays(epoch, givenDate);

	var banglaMonthIndex = 0;

	for (var i = 0; i < banglaMonths.length; i++) {
		if (dayRemaining <= totalMonthDays[i]) {
			banglaMonthIndex = i;
			break;
		}

		dayRemaining -= totalMonthDays[i];
	}

	var banglaDate = dayRemaining;

	var banglaSeason = banglaSeasons[Math.floor(banglaMonthIndex / 2)]; // ('পৌষ' + 'মাঘ') = 'শীত'. Every consecutive two index in 'banglaMonths' indicates a single index in 'banglaSeasons'.

	return {
		year: banglaYear,
		date: banglaDate,
		month: banglaMonths[banglaMonthIndex],
		day: weekDays[gregDay],
		season: banglaSeason
	};
}

String.prototype.convertDigitToBangla = function() {
	var convertToBanglaDigit = {
		'1': '১',
		'2': '২',
		'3': '৩',
		'4': '৪',
		'5': '৫',
		'6': '৬',
		'7': '৭',
		'8': '৮',
		'9': '৯',
		'0': '০'
	};

	return this.replace(/\d/g, function(match) {
		return convertToBanglaDigit[match];
	});
};

result = getBanglaDateAndMonth();
banglaDate = result.date.toString() + " " + result.month + ", " + result.year.toString();

banglaDate += "(" + result.day + ")";
banglaDate = result.date.toString() + " " + result.month + ", " + result.year.toString() + "[" + result.season + "]";

console.log(banglaDate.convertDigitToBangla());

document.getElementById("bangla-date").innerHTML = banglaDate.convertDigitToBangla();
