/**
 * Created by matsutaniyushiro on 2016/07/28.
 */
process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
    var line = chunk.toString();
    var trim = line.split('\n');
    var num = trim[0];
    var top = num.split(' ');
    var row = top[0];
    var column = top[1];

    for (var i=1;i<row+1;i++){
        var left = 0;
        var right = 0;
        var choice = trim[i].split(' ');
        if(choice[0]<128&&choice[1]<128){
            left = 0;
            right = 0;

        } else if(choice[0]<128&&choice[1]>127) {
            left = 0;
            right = 1;
        } else if(choice[0]>127&&choice[1]<128) {
            left = 1;
            right = 0;
        } else if(choice[0]>127&&choice[1]>127) {
            left = 1;
            right = 0;
        }
        console.log(right);
        console.log(left);
    }

});
