/**
 * Created by Heretic on 21/07/2015.
 */
exports.Player = function () {
    this.nbTokens = 0;
    this.clock = 5000;
    var that = this;

    var addToken = function () {
        that.nbTokens++;
    };
};