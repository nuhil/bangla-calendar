(function($) {
	$.fn.bongabdo = function(options) {
		// To Do: Use the options to re-format return value
		if(options && options.date) {
			options.date = new Date(options.date);
		}
		
		var settings = $.extend({
			date: new Date(),
			displayLanguage: "bangla",
			dayStartsAt: "sunrise",
			showSeason: false,
			showWeekDays: false,
			format: "DD MM, YY"
		}, options);

		var banglaMonths = [ 'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র' ];
		var weekDays = [ 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার' ];
		var banglaSeasons = ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'];
		var totalMonthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];

		Date.prototype.addHours = function(h) {
			this.setHours(this.getHours() + h);
			return this;
		}

		function isLeapYear(year) {
			return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
		}
		
		// a and b are javascript Date objects
		function dateDiffInDays(a, b) {
			var MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
			var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
			var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
		
			return Math.floor((utc2 - utc1) / MILLISECONDS_PER_DAY);
		}

		function getBanglaDateAndMonth(givenDate) {
			givenDate = givenDate.addHours(-6);
		
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

		this.each(function() {
			var element = $(this);
			var result = getBanglaDateAndMonth(settings.date);
			var dateString = settings.format;
			dateString = dateString.replace(/DD/i, result.date.toString());
			dateString = dateString.replace(/MM/i, result.month);
			dateString = dateString.replace(/YY/i, result.year.toString());

			if (settings.showWeekDays) {
				dateString = dateString.replace(/WW/i, result.day);
			}

			if (settings.showSeason) {
				dateString = dateString.replace(/SS/i, result.season);
			}

			element.html(dateString.convertDigitToBangla());
		});

		return this;
	};

}(jQuery));
