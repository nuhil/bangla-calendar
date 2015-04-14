    // শুভ নববর্ষ ১৪২২
    // Original Author: Nuhil Mehdy <nuhil@nuhil.net>
    // fb.com/nuhil
    // returns Todays date in Bengali
    // Updated by Ujjal Suttra Dhar <self@ujjal.net>

    var timeStamp = new Date();
    var hours = engHours = timeStamp.getHours();
    var date = engDate = timeStamp.getDate();
    var month = engMonth = timeStamp.getMonth();
    var year = timeStamp.getFullYear();

    switch (month) {
        case 0:
            if (date >= 1 && date <= 13) {
                date += (hours < 6) ? 16 : 17;
                month = "অগ্রহায়ণ";
            } else {
                if (date == 14 && hours < 6) {
                    date += 16;
                    month = "অগ্রহায়ণ";
                } else {
                    date -= (hours < 6) ? 14 : 13;
                    month = "পৌষ";
                }
            }
            break;
        case 1:
            if (date >= 1 && date <= 12) {
                date += (hours < 6) ? 17 : 18;
                month = month = "পৌষ";
            } else {
                if (date == 13 && hours < 6) {
                    date += 17;
                    month = "পৌষ";
                } else {
                    date -= (hours < 6) ? 13 : 12;
                    month = "মাঘ";
                }
            }
            break;
        case 2:
            if (date >= 1 && date <= 14) {
                date += (hours < 6) ? (isLeapYear() ? 16 : 15) : (isLeapYear() ? 17 : 16);
                month = month = "মাঘ";
            } else {
                if (date == 15 && hours < 6) {
                    date += (isLeapYear() ? 16 : 15);
                    month = "মাঘ";
                } else {
                    date -= (hours < 6) ? 15 : 14;
                    month = "ফাল্গুন";
                }
            }
            break;
        case 3:
            if (date >= 1 && date <= 13) {
                date += (hours < 6) ? 16 : 17;
                month = month = "চৈত্র";
            } else {
                if (date == 14 && hours < 6) {
                    date += 16;
                    month = "চৈত্র";
                } else {
                    date -= (hours < 6) ? 14 : 13;
                    month = "বৈশাখ";
                }
            }
            break;
        case 4:
            if (date >= 1 && date <= 14) {
                date += (hours < 6) ? 16 : 17;
                month = "বৈশাখ";
            } else {
                if (date == 15 && hours < 6) {
                    date += 16;
                    month = "বৈশাখ";
                } else {
                    date -= (hours < 6) ? 15 : 14;
                    month = "জ্যৈষ্ঠ";
                }
            }
            break;
        case 5:
            if (date >= 1 && date <= 14) {
                date += (hours < 6) ? 16 : 17;
                month = "জ্যৈষ্ঠ";
            } else {
                if (date == 15 && hours < 6) {
                    date += 16;
                    month = "জ্যৈষ্ঠ";
                } else {
                    date -= (hours < 6) ? 15 : 14;
                    month = "আষাঢ়";
                }
            }
            break;
        case 6:
            if (date >= 1 && date <= 15) {
                date += (hours < 6) ? 15 : 16;
                month = "আষাঢ়";
            } else {
                if (date == 16 && hours < 6) {
                    date += 15;
                    month = "আষাঢ়";
                } else {
                    date -= (hours < 6) ? 16 : 15;
                    month = "শ্রাবণ";
                }
            }
            break;
        case 7:
            if (date >= 1 && date <= 15) {
                date += (hours < 6) ? 15 : 16;
                month = "শ্রাবণ";
            } else {
                if (date == 16 && hours < 6) {
                    date += 15;
                    month = "শ্রাবণ";
                } else {
                    date -= (hours < 6) ? 16 : 15;
                    month = "ভাদ্র";
                }
            }
            break;
        case 8:
            if (date >= 1 && date <= 15) {
                date += (hours < 6) ? 15 : 16;
                month = "ভাদ্র";
            } else {
                if (date == 16 && hours < 6) {
                    date += 15;
                    month = "ভাদ্র";
                } else {
                    date -= (hours < 6) ? 16 : 15;
                    month = "আশ্বিন";
                }
            }
            break;
        case 9:
            if (date >= 1 && date <= 15) {
                date += (hours < 6) ? 14 : 15;
                month = "আশ্বিন";
            } else {
                if (date == 16 && hours < 6) {
                    date += 14;
                    month = "আশ্বিন";
                } else {
                    date -= (hours < 6) ? 16 : 15;
                    month = "কার্তিক";
                }
            }
            break;
        case 10:
            if (date >= 1 && date <= 14) {
                date += (hours < 6) ? 15 : 16;
                month = "কার্তিক";
            } else {
                if (date == 15 && hours < 6) {
                    date += 15;
                    month = "কার্তিক";
                } else {
                    date -= (hours < 6) ? 15 : 14;
                    month = "অগ্রহায়ণ";
                }
            }
            break;
        case 11:
            if (date >= 1 && date <= 14) {
                date += (hours < 6) ? 15 : 16;
                month = "অগ্রহায়ণ";
            } else {
                if (date == 15 && hours < 6) {
                    date += 15;
                    month = "অগ্রহায়ণ";
                } else {
                    date -= (hours < 6) ? 15 : 14;
                    month = "পৌষ";
                }
            }
            break;
    }

    function isLeapYear() {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    function getBanglaYear() {
        if (engMonth >= 3) {
            if (engMonth == 3 && engDate < 13) {
                return (year - 594);
            } else if (engMonth == 3 && engDate == 13) {
                if (engHours < 6)
                    return (year - 594);
                else if (engHours >= 6)
                    return (year - 593);
            } else
                return (year - 593);

        } else {
            return (year - 594);
        }
    }
    
    String.prototype.convertDigitToBangla = function() {
      var convertToBanglaDigit = {'1': '১', '2': '২', '3': '৩', '4' : '৪', '5' : '৫', '6' : '৬', '7' : '৭', '8' : '৮', '9' : '৯',  '0' : '০'};
    
      return this.replace(/[1234567890]/g, function(match) {
        return convertToBanglaDigit[match];
      });
    };

    document.getElementById("bangla-date").innerHTML = (date.toString().convertDigitToBangla() + " " + month + ", " + getBanglaYear().toString().convertDigitToBangla());
