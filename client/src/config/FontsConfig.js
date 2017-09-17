
//字体资源，需要单独处理

var FontsRes = 
{
    fontRoot: "Font/",
    scoreNumber: "scoreNumber", //!!!names
    clockNumber: "clock_number",
    names: ["scoreNumber", "clock_number"], //注意这里不能this.scoreNumber 或者 FontsRes.scoreNumber
    files: ["scoreNumber.fnt", "clock_number.fnt"] //要跟name对应
}