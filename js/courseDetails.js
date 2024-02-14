var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getCourseDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, url, query, options, response, jsonResponse, data, courseDetails, courseName, enrolledStudentTableBody_1, studentTableBody, row, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URLSearchParams(window.location.search);
                    console.log(searchParams.get('courseId'));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = "http://155.248.246.152:8081/graphql";
                    query = "\n    query Query($getCourseId: ObjectId!) {\n        GetCourse(id: $getCourseId) {\n          _id\n          isActive\n          lastPaymentGeneration\n          name\n          students {\n            _id\n            isActive\n            name\n            courses {\n              lastPaymentGeneration\n            }\n          }\n        }\n      }\n          ";
                    options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDlkZTQyZGMyYjI3Y2Q4ZjE0MDE3OTEiLCJpYXQiOjE3MDU5MjgxMjN9.k_vS11NYSfhaHHOl7jjUl2t7UCfdTGeythCsk0Hr89g",
                        },
                        body: JSON.stringify({
                            query: query,
                            variables: {
                                "getCourseId": searchParams.get('courseId')
                            }
                        }),
                    };
                    return [4 /*yield*/, fetch(url, options)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    jsonResponse = _a.sent();
                    console.log("Received data:", jsonResponse);
                    data = jsonResponse.data;
                    if (data.GetCourse) {
                        courseDetails = data.GetCourse;
                        courseName = document.getElementById("coName");
                        courseName.textContent = courseDetails.name;
                        enrolledStudentTableBody_1 = document.getElementById("coTable").children[1];
                        courseDetails.students.forEach(function (student) {
                            var row = document.createElement("tr");
                            row.innerHTML = "\n          <td><a href=\"studentProfile.html?studentId=".concat(student._id, "\">").concat(student._id, "</a></td>\n          <td>").concat(student.name, "</td>\n          <td>").concat(student.isActive, "</td>\n          \n      ");
                            enrolledStudentTableBody_1.appendChild(row);
                        });
                        studentTableBody = document.getElementById("courseDetailsTable").children[1];
                        row = document.createElement("tr");
                        row.innerHTML = "\n          <td>".concat(courseDetails._id, "</td>\n          <td>").concat(courseDetails.isActive, "</td>  \n      ");
                        studentTableBody.appendChild(row);
                        console.log("Table loaded successfully.");
                    }
                    else {
                        console.error("Data received is not in the expected format");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
getCourseDetails();
//# sourceMappingURL=courseDetails.js.map