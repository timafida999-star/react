function fmt(value) {
  if (value === undefined) return "undefined";
  if (typeof value === "function") return value.toString();
  if (typeof value === "number" && Number.isNaN(value)) return "NaN";
  return JSON.stringify(value, null, 2);
}

function showText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}

function table(id, rows, columns) {
  var el = document.getElementById(id);
  if (!el || !rows.length) return;
  var html = "<table class='data-table'><thead><tr>";
  columns.forEach(function (c) { html += "<th>" + c.label + "</th>"; });
  html += "</tr></thead><tbody>";
  rows.forEach(function (row) {
    html += "<tr>";
    columns.forEach(function (c) {
      var v = c.get(row);
      html += "<td>" + (typeof v === "boolean" ? (v ? "true" : "false") : v) + "</td>";
    });
    html += "</tr>";
  });
  html += "</tbody></table>";
  el.innerHTML = html;
}

(function () {
  var studentName = "Aigerim";
  var age = 21;
  var isActive = true;
  var courses = ["Math", "CS", "Physics"];
  var address = { city: "Almaty", street: "Abay Ave" };
  var scholarship = null;
  var graduationYear;

  var lines = [
    "studentName = " + fmt(studentName) + "   (" + typeof studentName + ")",
    "age         = " + fmt(age) + "        (" + typeof age + ")",
    "isActive    = " + fmt(isActive) + "     (" + typeof isActive + ")",
    "courses     = " + fmt(courses) + "  (" + typeof courses + ")",
    "address     = " + fmt(address) + " (" + typeof address + ")",
    "scholarship = " + fmt(scholarship) + "        (" + typeof scholarship + ")  <- null on purpose",
    "graduationYear = " + fmt(graduationYear) + "  (" + typeof graduationYear + ")  <- never assigned"
  ];
  showText("out-s1-values", lines.join("\n"));

  var sentence = studentName + " is " + age + " years old, is " +
    (isActive ? "an active" : "an inactive") + " student living in " + address.city +
    ", currently taking " + courses.length + " courses: " + courses.join(", ") + ".";
  showText("out-s1-sentence",
    "const sentence = `${studentName} is ${age} years old, is ${isActive ? \"an active\" : \"an inactive\"} " +
    "student living in ${address.city}, currently taking ${courses.length} courses: ${courses.join(\", \")}.`;\n\n" +
    "// -> \"" + sentence + "\""
  );

  showText("out-s1-kinds",
    "studentName, age, isActive are PRIMITIVE (stored by value: string, number, boolean). " +
    "courses and address are REFERENCE values (arrays/objects, stored by pointer to memory)."
  );
})();

(function () {
  var numbers = [3, 7, 2, 10, 5];
  var doubled = numbers.map(function (n) { return n * 2; });
  var greaterThan5 = numbers.filter(function (n) { return n > 5; });
  var firstOver5 = numbers.find(function (n) { return n > 5; });
  var total = numbers.reduce(function (sum, n) { return sum + n; }, 0);
  var has10 = numbers.includes(10);

  showText("out-s2",
    "numbers                -> " + fmt(numbers) + "\n" +
    "doubled (map x2)       -> " + fmt(doubled) + "\n" +
    "greaterThan5 (filter)  -> " + fmt(greaterThan5) + "\n" +
    "firstOver5 (find)      -> " + fmt(firstOver5) + "\n" +
    "total (reduce)         -> " + fmt(total) + "\n" +
    "has10 (includes)       -> " + fmt(has10) + "\n" +
    "numbers again, unchanged -> " + fmt(numbers)
  );
})();

(function () {
  var students = [
    { id: 1, name: "Anna", grade: 85 },
    { id: 2, name: "John", grade: 62 },
    { id: 3, name: "Sara", grade: 91 },
    { id: 4, name: "Mike", grade: 55 }
  ];
  var cols = [
    { label: "id", get: function (s) { return s.id; } },
    { label: "name", get: function (s) { return s.name; } },
    { label: "grade", get: function (s) { return s.grade; } }
  ];
  table("out-s3-original", students, cols);

  var passing = students.filter(function (s) { return s.grade >= 70; });
  table("out-s3-passing", passing, cols);

  var names = students.map(function (s) { return s.name; });
  var byId3 = students.find(function (s) { return s.id === 3; });
  var top = students.reduce(function (a, b) { return b.grade > a.grade ? b : a; });
  var avg = students.reduce(function (sum, s) { return sum + s.grade; }, 0) / students.length;

  showText("out-s3-misc",
    "names       -> " + fmt(names) + "\n" +
    "id === 3    -> " + fmt(byId3) + "\n" +
    "top student -> " + fmt(top) + "\n" +
    "average     -> " + fmt(Math.round(avg * 100) / 100)
  );

  var withPassFlag = students.map(function (s) {
    return Object.assign({}, s, { passed: s.grade >= 70 });
  });
  table("out-s3-flagged", withPassFlag, [
    { label: "id", get: function (s) { return s.id; } },
    { label: "name", get: function (s) { return s.name; } },
    { label: "grade", get: function (s) { return s.grade; } },
    { label: "passed", get: function (s) { return s.passed; } }
  ]);
})();

(function () {
  var user = {
    id: 1,
    name: "Nurlybek",
    age: 23,
    address: { city: "Almaty", street: "Dostyk Ave" }
  };
  var originalName = user.name;
  var originalCity = user.address.city;

  user.age = 24;
  user.email = "nurlybek@example.com";
  delete user.address.street;

  var name = user.name, age = user.age;
  var city = user.address.city;
  var userName = user.name;

  showText("out-s4",
    "read -> name: " + fmt(originalName) + ", city: " + fmt(originalCity) + "\n\n" +
    "after changes -> " + fmt(user) + "\n\n" +
    "destructured { name, age }        -> name=" + fmt(name) + ", age=" + fmt(age) + "\n" +
    "nested destructured { address: { city } } -> city=" + fmt(city) + "\n" +
    "renamed { name: userName }        -> userName=" + fmt(userName)
  );
})();

(function () {
  var original = { name: "Alice", score: 10 };
  var copy = original;
  copy.score = 99;
  showText("out-s5-a",
    "copy.score = 99;\noriginal -> " + fmt(original) + "\ncopy     -> " + fmt(copy) +
    "\n\n-> original also changed! copy and original are the SAME object in memory."
  );

  var original2 = { name: "Alice", score: 10 };
  var properCopy = Object.assign({}, original2);
  properCopy.score = 50;
  showText("out-s5-b",
    "properCopy.score = 50;\noriginal2   -> " + fmt(original2) + "\nproperCopy  -> " + fmt(properCopy) +
    "\n\n-> original2 is untouched now that properCopy is a real, separate object."
  );

  var userA = { name: "Alice", address: { city: "Almaty" } };
  var userB = Object.assign({}, userA);
  userB.address.city = "Astana";
  showText("out-s5-c",
    "userB.address.city = \"Astana\";\nuserA -> " + fmt(userA) + "\nuserB -> " + fmt(userB) +
    "\n\n-> userA.address.city ALSO changed, even though we only touched userB!"
  );

  var userC = { name: "Alice", address: { city: "Almaty" } };
  var userD = Object.assign({}, userC, { address: Object.assign({}, userC.address) });
  userD.address.city = "Astana";
  showText("out-s5-d",
    "Correct deep-ish copy:\nconst userD = { ...userC, address: { ...userC.address } };\n" +
    "userD.address.city = \"Astana\";\n\n" +
    "userC -> " + fmt(userC) + "\nuserD -> " + fmt(userD) +
    "\n\n-> now userC is untouched, because address itself was also copied."
  );
})();

(function () {
  function isEven(number) { return number % 2 === 0; }
  var isEvenArrow = function (number) { return number % 2 === 0; };
  function getFullName(firstName, lastName) { return firstName + " " + lastName; }
  var calculatePrice = function (price, quantity) { return price * quantity; };
  var calculateDiscount = function (price, percent) { return price - (price * percent) / 100; };
  var getMax = function (a, b) { return a > b ? a : b; };

  showText("out-s6",
    "isEven(4)                      -> " + fmt(isEven(4)) + "\n" +
    "isEvenArrow(7)                 -> " + fmt(isEvenArrow(7)) + "\n" +
    "getFullName(\"Nurlybek\",\"A.\")   -> " + fmt(getFullName("Nurlybek", "A.")) + "\n" +
    "calculatePrice(1500, 3)        -> " + fmt(calculatePrice(1500, 3)) + "\n" +
    "calculateDiscount(1000, 20)    -> " + fmt(calculateDiscount(1000, 20)) + "\n" +
    "getMax(8, 15)                  -> " + fmt(getMax(8, 15))
  );
})();

(function () {
  var add = function (a, b) { return a + b; };
  var multiply = function (a, b) { return a * b; };
  function calculate(a, b, operation) { return operation(a, b); }

  showText("out-s7",
    "calculate(5, 3, add)      -> " + fmt(calculate(5, 3, add)) + "\n" +
    "calculate(5, 3, multiply) -> " + fmt(calculate(5, 3, multiply)) + "\n" +
    "typeof add                -> " + typeof add + "\n" +
    "typeof add(5,3)           -> " + typeof add(5, 3)
  );
})();

var message = "global";
(function () {
  function scopeDemo() {
    var message = "function";
    var insideFunction = message;
    var insideBlockValue;
    {
      let message = "block";
      insideBlockValue = message;
    }
    var afterBlock = message;
    return { insideFunction: insideFunction, insideBlockValue: insideBlockValue, afterBlock: afterBlock };
  }
  var res = scopeDemo();

  var varLeakResult, letLeakResult, constLeakResult;
  {
    var varInBlock = "I am var";
    let letInBlock = "I am let";
    const constInBlock = "I am const";
    varLeakResult = "accessible inside block: " + varInBlock;
  }
  try { varLeakResult = "outside block, var IS accessible -> " + varInBlock; }
  catch (e) { varLeakResult = "outside block, var threw -> " + e.message; }
  try { letLeakResult = "outside block, let IS accessible -> " + letInBlock; }
  catch (e) { letLeakResult = "outside block, let threw -> " + e.constructor.name + ": " + e.message; }
  try { constLeakResult = "outside block, const IS accessible -> " + constInBlock; }
  catch (e) { constLeakResult = "outside block, const threw -> " + e.constructor.name + ": " + e.message; }

  showText("out-s8",
    "global message                -> " + fmt(message) + "\n" +
    "inside function (message)     -> " + fmt(res.insideFunction) + "\n" +
    "inside if/block (message)     -> " + fmt(res.insideBlockValue) + "\n" +
    "back in function after block  -> " + fmt(res.afterBlock) +
    "   (block's \"message\" did NOT leak out)\n\n" +
    "var  : " + varLeakResult + "\n" +
    "let  : " + letLeakResult + "\n" +
    "const: " + constLeakResult
  );
})();

(function () {
  function createCounter() {
    var count = 0;
    return function () {
      count += 1;
      return count;
    };
  }
  var counterA = createCounter();
  var counterB = createCounter();
  var a1 = counterA(), a2 = counterA(), a3 = counterA();
  var b1 = counterB();

  function createAdder(value) {
    return function (x) { return x + value; };
  }
  var addFive = createAdder(5);

  showText("out-s9",
    "counterA() -> " + a1 + "\n" +
    "counterA() -> " + a2 + "\n" +
    "counterA() -> " + a3 + "\n" +
    "counterB() -> " + b1 + "   (independent - starts back at 1)\n\n" +
    "const addFive = createAdder(5);\n" +
    "addFive(10) -> " + addFive(10) + "\n" +
    "addFive(20) -> " + addFive(20)
  );
})();

(function () {
  var numbersArr = [10, 20, 30, 40];
  var first = numbersArr[0], second = numbersArr[1];

  var user = { id: 1, name: "Anna", age: 21 };
  var name = user.name, age = user.age;

  var numbersPlus50 = numbersArr.concat([50]);
  var olderUser = Object.assign({}, user, { age: 22 });
  var userWithEmail = Object.assign({}, user, { email: "anna@example.com" });

  var arrA = [1, 2], arrB = [3, 4];
  var combined = arrA.concat(arrB);

  function sum() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.reduce(function (t, n) { return t + n; }, 0);
  }

  showText("out-s10",
    "[first, second] from " + fmt(numbersArr) + " -> first=" + first + ", second=" + second + "\n" +
    "{ name, age } from user -> name=" + fmt(name) + ", age=" + age + "\n\n" +
    "numbersPlus50 (spread+50) -> " + fmt(numbersPlus50) + "\n" +
    "numbersArr still          -> " + fmt(numbersArr) + "\n\n" +
    "olderUser (spread, age:22)     -> " + fmt(olderUser) + "\n" +
    "userWithEmail (spread + email) -> " + fmt(userWithEmail) + "\n" +
    "original user untouched        -> " + fmt(user) + "\n\n" +
    "combined = [...arrA, ...arrB]  -> " + fmt(combined) + "\n\n" +
    "sum(1, 2)       -> " + fmt(sum(1, 2)) + "\n" +
    "sum(1, 2, 3, 4) -> " + fmt(sum(1, 2, 3, 4))
  );
})();

(function () {
  var userWithAddress = { name: "Aika", address: { city: "Almaty" } };
  var userWithoutAddress = { name: "Nurlan" };

  var unsafeResult;
  try {
    unsafeResult = userWithoutAddress.address.city;
  } catch (e) {
    unsafeResult = e.constructor.name + ": " + e.message;
  }

  var safeCity = userWithoutAddress.address ? userWithoutAddress.address.city : undefined;
  var cityOrText = safeCity !== undefined && safeCity !== null ? safeCity : "City not specified";
  var withAddressCity = userWithAddress.address ? userWithAddress.address.city : undefined;

  showText("out-s11-main",
    "userWithoutAddress.address.city (direct)        -> THROWS: " + unsafeResult + "\n" +
    "userWithoutAddress.address?.city (optional chain) -> " + fmt(safeCity) + "\n" +
    "...  ?? \"City not specified\"                     -> " + fmt(cityOrText) + "\n" +
    "userWithAddress.address?.city                     -> " + fmt(withAddressCity)
  );

  var testValues = [0, "", false, null, undefined];
  var rows = testValues.map(function (v) {
    var orResult = v || "Default";
    var nullishResult = (v === null || v === undefined) ? "Default" : v;
    return { value: v, orResult: orResult, nullishResult: nullishResult };
  });
  table("out-s11-table", rows, [
    { label: "value", get: function (r) { return fmt(r.value); } },
    { label: "value || \"Default\"", get: function (r) { return fmt(r.orResult); } },
    { label: "value ?? \"Default\"", get: function (r) { return fmt(r.nullishResult); } }
  ]);
})();

(function () {
  var students = [
    { id: 1, name: "Anna", age: 21, grades: [85, 90, 78] },
    { id: 2, name: "John", age: 22, grades: [60, 55, 58] },
    { id: 3, name: "Sara", age: 20, grades: [91, 95, 89] },
    { id: 4, name: "Mike", age: 23, grades: [40, 65, 50] },
    { id: 5, name: "Dana", age: 21, grades: [72, 68, 74] }
  ];
  var PASS_MARK = 60;

  var getAverage = function (grades) {
    return grades.reduce(function (sum, g) { return sum + g; }, 0) / grades.length;
  };
  var getStudentAverage = function (student) { return getAverage(student.grades); };
  var getPassedStudents = function (studentsArr) {
    return studentsArr.filter(function (s) { return getStudentAverage(s) >= PASS_MARK; });
  };
  var getStudentNames = function (studentsArr) {
    return studentsArr.map(function (s) { return s.name; });
  };
  var findStudent = function (studentsArr, id) {
    return studentsArr.find(function (s) { return s.id === id; });
  };
  var getTopStudent = function (studentsArr) {
    return studentsArr.reduce(function (top, s) {
      return getStudentAverage(s) > getStudentAverage(top) ? s : top;
    });
  };

  table("out-final-original", students, [
    { label: "id", get: function (s) { return s.id; } },
    { label: "name", get: function (s) { return s.name; } },
    { label: "age", get: function (s) { return s.age; } },
    { label: "grades", get: function (s) { return fmt(s.grades); } }
  ]);

  var passed = getPassedStudents(students);
  var names = getStudentNames(students);
  var byId3 = findStudent(students, 3);
  var top = getTopStudent(students);

  showText("out-final-helpers",
    "getAverage([85,90,78])          -> " + fmt(Math.round(getAverage([85, 90, 78]) * 100) / 100) + "\n" +
    "getStudentAverage(Anna)         -> " + fmt(Math.round(getStudentAverage(students[0]) * 100) / 100) + "\n" +
    "getPassedStudents -> names:     -> " + fmt(getStudentNames(passed)) + "\n" +
    "getStudentNames(students)       -> " + fmt(names) + "\n" +
    "findStudent(students, 3)        -> " + fmt(byId3) + "\n" +
    "getTopStudent(students)         -> " + fmt(top.name) + " (avg " + Math.round(getStudentAverage(top) * 100) / 100 + ")"
  );

  var report = students.map(function (s) {
    return {
      id: s.id,
      name: s.name,
      average: Math.round(getStudentAverage(s) * 100) / 100,
      passed: getStudentAverage(s) >= PASS_MARK
    };
  });
  table("out-final-report", report, [
    { label: "id", get: function (r) { return r.id; } },
    { label: "name", get: function (r) { return r.name; } },
    { label: "average", get: function (r) { return r.average; } },
    { label: "passed", get: function (r) { return r.passed; } }
  ]);
})();

document.addEventListener("DOMContentLoaded", function () {
  var track = document.getElementById("track");
  var slides = Array.prototype.slice.call(track.querySelectorAll(".slide"));
  var total = slides.length;
  var current = 0;

  var dotsWrap = document.getElementById("dots");
  var counter = document.getElementById("counter");
  var progressFill = document.getElementById("progress-fill");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");

  var dotEls = slides.map(function (slide, i) {
    var b = document.createElement("button");
    b.className = "dot";
    b.setAttribute("aria-label", "Go to task " + (i + 1));
    b.addEventListener("click", function () { goTo(i); });
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    track.style.transform = "translateX(-" + (current * 100) + "%)";
    dotEls.forEach(function (dot, i) {
      dot.classList.toggle("active", i === current);
    });
    counter.textContent = "Task " + (current + 1) + " of " + total;
    progressFill.style.width = ((current + 1) / total * 100) + "%";
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  function goTo(i) {
    current = Math.max(0, Math.min(total - 1, i));
    render();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });

  var touchStartX = null;
  track.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    touchStartX = null;
  }, { passive: true });

  render();
});
