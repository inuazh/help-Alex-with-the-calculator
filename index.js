
function calculate() {
    var input = document.getElementById('expression').value;

    // Проверка наличия арифметической операции
    if (!input.includes('+') && !input.includes('-') && !input.includes('*') && !input.includes('/')) {
        throw new Error('Ошибка: некорректный математический пример!');
    }

    var parts = input.split(' ');
    var a = convertToNumber(parts[0]);
    var b = convertToNumber(parts[2]);
    var operator = parts[1];

    // Проверка наличия только арабских или только римских цифр
    if ((isArabicNumber(a) && isRomanNumber(b)) || (isRomanNumber(a) && isArabicNumber(b))) {
        throw new Error('Ошибка: использованы одновременно арабские и римские цифры!');
    }

    var result;

    // Выполнение операции в зависимости от арифметического оператора
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = Math.floor(a / b);
            break;
        default:
            throw new Error('Ошибка: некорректный оператор!');
    }

    // Конвертация результата в римскую или арабскую цифру
    if (isArabicNumber(result)) {
        document.getElementById('result').innerHTML = result.toString();
    } else {
        document.getElementById('result').innerHTML = convertToRoman(result);
    }
}

function convertToNumber(input) {
    if (isArabicNumber(input)) {
        return parseInt(input, 10);
    } else if (isRomanNumber(input)) {
        return convertToArabic(input);
    } else {
        throw new Error('Ошибка: некорректное число!');
    }
}

function isArabicNumber(input) {
    return /^\d+$/.test(input) && input >= 1 && input <= 10;
}

function isRomanNumber(input) {
    return /^[IVX]+$/.test(input);
}

function convertToArabic(input) {
    var romanNumerals = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10
    };

    var result = 0;
    for (var i = 0; i < input.length; i++) {
        var currentSymbol = input[i];
        var currentValue = romanNumerals[currentSymbol];
        var nextValue = romanNumerals[input[i + 1]];

        if (nextValue && nextValue > currentValue) {
            result += nextValue - currentValue;
            i++;
        } else {
            result += currentValue;
        }
    }

    return result;
}

function convertToRoman(input) {
    if (input === 0) {
        return '';
    }

    var arabicNumerals = [10, 9, 5, 4, 1];
    var romanNumerals = ['X', 'IX', 'V', 'IV', 'I'];

    var result = '';
    var i = 0;

    while (input > 0) {
        if (input >= arabicNumerals[i]) {
            result += romanNumerals[i];
            input -= arabicNumerals[i];
        } else {
            i++;
        }
    }

    return result;
}