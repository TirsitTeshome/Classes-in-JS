// //Question-1

function FeatureToggle(featureName, isEnabled, userGroupAccess) {
  this.featureName = featureName;
  this.isEnabled = isEnabled;
  this.userGroupAccess = userGroupAccess;
}

FeatureToggle.prototype.canAccess = function (userRole) {
  return this.isEnabled && this.userGroupAccess.includes(userRole)
};

FeatureToggle.prototype.toggleFeature = function (flag) {
  this.isEnabled = flag;
}

const feature = new FeatureToggle("Engineer", false, ["admins", "developer", "tester"])


console.log(`Admin can access: ${feature.canAccess("admins")}`);
console.log(`User can access: ${feature.canAccess("user")}`)


feature.toggleFeature(false);
console.log(`Feature ${feature.featureName} is now: ${feature.isEnabled}`);
console.log(`Admin can access: ${feature.canAccess("admins")}`)


let userRole = "Tester";
if (feature.canAccess(userRole)) {
  console.log(`"${userRole}" can access the feature ${feature.featureName}.`);
} else {
  console.log(`${userRole} can't access the feature ${feature.featureName}.`);
}

userRole = "QA Tester"
switch (userRole) {
  case "Admin":
    console.log("Admin access granted.");
    break;
  case "Backend Engineer":
    console.log("Access to the database.");
    break;
  case "UX researcher":
    console.log("Limited access to database.");
    break;
  case "QA Tester":
    console.log("Access to test features granted.");
    break;
  default:
    console.log("Access denied.");
    break;
}
console.log("");




//Question 2

function TimeLog(freelancerName, projectDetails, logs) {
  this.freelancerName = freelancerName;
  this.projectDetails = projectDetails;
  this.logs = logs;
}

TimeLog.prototype.totalEarnings = function () {
  const totalHours = this.logs.reduce((sum, hours) => sum + hours.hoursWorked, 0)
  const earnings = this.projectDetails.rate * totalHours
  console.log(`${this.freelancerName} has earned ${earnings}$`)
}


TimeLog.prototype.filterlogs = function (startDate, endDate) {
  return this.logs.filter(day => {
    const logDate = new Date(day.date);
    return logDate >= new Date(startDate) && logDate <= new Date(endDate);
  });
}

TimeLog.prototype.weeklyHoursCheck = function () {
  const weeklyHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
  if (weeklyHours > 40) {
    return `${this.freelancerName} worked overtime this week.`
  } else {
    return `${this.freelancerName} has worked less than 40 hours this week.`

  }
}

const freeLancer = new TimeLog("Tirsit", { name: "Tirsit", rate: 5 },
  [

    { date: "2025-05-4", hoursWorked: 16 },
    { date: "2025-05-6", hoursWorked: 22 },
    { date: "2025-03-9", hoursWorked: 8 },
    { date: "2025-05-11", hoursWorked: 1 },

  ]
)

freeLancer.totalEarnings()
console.log(freeLancer.filterlogs("2025-05-6", "2025-05-11"))
console.log(freeLancer.weeklyHoursCheck())
console.log("");


//Question 3

function Order(customer, items, status) {
  this.customer = customer;
  this.items = items;
  this.status = status;
}
Order.prototype.totalCost = function () {
  return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
};
Order.prototype.updateStatus = function (paymentReceived) {
  if (paymentReceived) {
    this.status = "Paid";
  } else {
    this.status = "Pending";
  }
};

Order.prototype.orderUrgency = function () {
  switch (this.status) {
    case "Pending":
      console.log("Order is being processed.");
      break;
    case "Paid":
      console.log("Amount paid.");
      break;
    default:
      console.log("Order status unknown.");
  }
};

let order = new Order({ name: "Tirsit", email: "tirsit@gmail.com" }, [
  { productName: "phone", quantity: 1, unitPrice: 10000 },
  { productName: "phone case", quantity: 1, unitPrice: 500 }
], "paid");

console.log("Total:", order.totalCost());
order.updateStatus(true);
order.orderUrgency();

console.log(" ")


// Question 4

function Employee(id, name, performanceMetrics, feedbackList) {
  this.id = id;
  this.name = name;
  this.performanceMetrics = performanceMetrics;
  this.feedbackList = feedbackList;
}
Employee.prototype.average = function () {
  const scores = Object.values(this.performanceMetrics);
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  return totalScore / scores.length;
};
Employee.prototype.getPerformanceLevel = function () {
  const averageScore = this.average();
  if (averageScore >= 4.5) {
    return "Excellent";
  } else if (averageScore >= 3.5) {
    return "very Good";
  } else {
    return "good";
  }
};
Employee.prototype.addFeedback = function (comment) {
  this.feedbackList.push(comment);
};
const employee = new Employee(2025046, "Tirsit",
  {
    reliability: 93,
    communication: 80,
    efficiency: 75
  },
  ["You did a good job", "You need to do more", "You need some improvement"]

);

employee.addFeedback("Keep it up");

console.log(employee);
console.log(employee.average());
console.log(employee.getPerformanceLevel());


console.log(" ")

//Question 5

function Course(title, instructor,students) {
  this.title = title;
  this.instructor = instructor;
  this.students =students;
}
Course.prototype.getCompletedStudentNames = function () {
  return this.students
      .filter(student => student.completionStatus)
      .map(student => student.name);
};
Course.prototype.countStudentsByExpertise= function () {
  const expertiseCounts = {};
  this.students.forEach(student => {
      const expertise = student.expertise;
      if (!expertiseCounts[expertise]) {
          expertiseCounts[expertise] = 0;
      }
      expertiseCounts[expertise]++;
  });
  return expertiseCounts;
};
Course.prototype.instructorMessage = function () {
  return this.students.length > 5
      ? "The class is full!"
      : "register more students.";
};
const takeCourses=new Course("Frontend Development", 
  {name: "Tirsit", expertise: "Web Developer" },
  [
      { name: "Aman", completionStatus: false, expertise: "software development" },
      { name: "Danny", completionStatus: true, expertise: "Backend engineering" },
      { name: "Abel", completionStatus: true, expertise: "Frontend Engineering" },
      { name: "Nina", completionStatus: true, expertise: "AI engineering" },
      { name: "Arsema", completionStatus: false, expertise: "sotware development" }
    ]
    
    
);
console.log(takeCourses.instructorMessage());
console.log(takeCourses.getCompletedStudentNames());
console.log(takeCourses.countStudentsByExpertise());