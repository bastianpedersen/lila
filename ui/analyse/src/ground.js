var m = require('mithril');
var Chessground = require('chessground').Chessground;

module.exports = function(ctrl) {
  return m('div.cg-board-wrap', {
    config: function(el, isUpdate) {
      if (!isUpdate) ctrl.chessground = Chessground(el, makeConfig(ctrl));
    }
  });
}

function makeConfig(ctrl) {
  var opts = ctrl.makeCgOpts();
  return {
    fen: opts.fen,
    check: opts.check,
    lastMove: opts.lastMove,
    orientation: ctrl.data.orientation,
    coordinates: ctrl.data.pref.coords !== 0,
    movable: {
      free: false,
      color: opts.movable.color,
      dests: opts.movable.dests,
      rookCastle: ctrl.data.pref.rookCastle
    },
    events: {
      move: ctrl.userMove,
      dropNewPiece: ctrl.userNewPiece
    },
    premovable: {
      enabled: opts.premovable
    },
    drawable: {
      enabled: true,
      eraseOnClick: !ctrl.opts.study || ctrl.opts.practice
    },
    highlight: {
      lastMove: ctrl.data.pref.highlight,
      check: ctrl.data.pref.highlight
    },
    animation: {
      enabled: true,
      duration: ctrl.data.pref.animationDuration
    },
    disableContextMenu: true
  };
}

module.exports.promote = function(ground, key, role) {
  var pieces = {};
  var piece = ground.data.pieces[key];
  if (piece && piece.role == 'pawn') {
    pieces[key] = {
      color: piece.color,
      role: role
    };
    ground.setPieces(pieces);
  }
}
