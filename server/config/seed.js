/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Player = require('../api/player/player.model');
var Team = require('../api/team/team.model');



User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Brian',
    email: 'admin@admin.com',
    password: 'jordan23'
  }, function() {
    User.find({}, function(err, users) {
      // at this point we have created 2 users
      // create some teams and assign to users
      Team.find({}).remove(function() {
        Team.create({
          name: 'Steelers', players: [],
        }, {
          name: 'Lions', players: []
        }, function() {
          addTeamsToUsers(users);
        });
      });
    });
  });
});

function addTeamToUser(user, team, cb) {
  user.team = team;
  user.save(function(err, user) {
    User.findById(user._id).
    populate("team")
    .exec(function(err, user) {
      console.log('Saved user: ' + JSON.stringify(user));
      if (cb) {
        cb();
      }
    });
  });
}

function addTeamsToUsers(users) {
  Team.find({}, function(err, teams) {
    addTeamToUser(users[0], teams[0], function() {
      addTeamToUser(users[1], teams[1], function() {
        console.log('finished populating users');
        createPlayers();
      });
    });
  });
}

function createPlayers() {
  Player.find({}).remove(function() {
    Player.create(
      {name: 'Aaron Rodgers ', age: 26, team: 'GB', bye: '10', position: 'QB', qty: '1', projPts: '315', paTD: '34', ruTD: '5', reTD: '0', paYds: '5200', ruYds: '430', reYds: '0', selected: false, imageFile: 'qb_aaronRodgers.png'},
      {name: 'Drew Brees ', age: 31, team: 'NO', bye: '10', position: 'QB', qty: '1', projPts: '290', paTD: '36', ruTD: '2', reTD: '0', paYds: '5430', ruYds: '320', reYds: '0', selected: false, imageFile: 'qb_drewBrees.png'},
      {name: 'Peyton Manning ', age: 34, team: 'IND', bye: '7', position: 'QB', qty: '1', projPts: '283', paTD: '40', ruTD: '1', reTD: '0', paYds: '4900', ruYds: '220', reYds: '0', selected: false, imageFile: 'qb_peytonManning.png' },
      {name: 'Philip Rivers ', age: 28, team: 'SD', bye: '10', position: 'QB', qty: '1', projPts: '271', paTD: '32', ruTD: '2', reTD: '0', paYds: '4650', ruYds: '200', reYds: '0', selected: false, imageFile: 'qb_phillipRivers.png' },
      {name: 'Matt Ryan  ', age: 25, team: 'ATL', bye: '8', position: 'QB', qty: '1', projPts: '237', paTD: '27', ruTD: '4', reTD: '0', paYds: '4880', ruYds: '400', reYds: '0', selected: false, imageFile: 'qb_mattRyan.png' },
      {name: 'Jay Cutler', age: 27, team: 'CHI', bye: '8', position: 'QB', qty: '1', projPts: '230', paTD: '26', ruTD: '3', reTD: '0', paYds: '4300', ruYds: '480', reYds: '0', selected: false, imageFile: 'qb_jayCutler.png' },
      {name: 'Eli Manning', age: 29, team: 'NYG', bye: '8', position: 'QB', qty: '1', projPts: '226', paTD: '23', ruTD: '2', reTD: '0', paYds: '5400', ruYds: '330', reYds: '0', selected: false, imageFile: 'qb_eliManning.png' },
      {name: 'Ben Roethlisberger', age: 28, team: 'PIT', bye: '5', position: 'QB', qty: '1', projPts: '193', paTD: '26', ruTD: '2', reTD: '0', paYds: '4600', ruYds: '390', reYds: '0', selected: false, imageFile: 'qb_benRoethlisberger.png' },
      {name: 'Matthew Stafford', age: 22, team: 'DET', bye: '7', position: 'QB', qty: '1', projPts: '186', paTD: '30', ruTD: '1', reTD: '0', paYds: '4990', ruYds: '210', reYds: '0', selected: false, imageFile: 'qb_matthewStafford.png' },
      {name: 'Jamaal Charles', age: 25, team: 'KC', bye: '4', position: 'RB', qty: '1', projPts: '283', paTD: '0', ruTD: '10', reTD: '4', paYds: '0', ruYds: '1294', reYds: '599', selected: false, imageFile: 'rb_jamaalCharles.png' },
      {name: 'LeSean McCoy', age: 23, team: 'PHI', bye: '8', position: 'RB', qty: '1', projPts: '267', paTD: '0', ruTD: '10', reTD: '3', paYds: '0', ruYds: '1451', reYds: '385', selected: false, imageFile: 'rb_leseanMccoy.png' },
      {name: 'Matt Forte', age: 27, team: 'CHI', bye: '9', position: 'RB', qty: '1', projPts: '260', paTD: '0', ruTD: '8', reTD: '3', paYds: '0', ruYds: '1272', reYds: '543', selected: false, imageFile: 'rb_mattForte.png' },
      {name: 'Adrian Peterson', age: 23, team: 'MIN', bye: '4', position: 'RB', qty: '1', projPts: '202', paTD: '0', ruTD: '11', reTD: '2', paYds: '0', ruYds: '1379', reYds: '274', selected: false, imageFile: 'rb_adrianPeterson.png' },
      {name: 'DeMarco Murray', age: 22, team: 'DAL', bye: '8', position: 'RB', qty: '1', projPts: '194', paTD: '0', ruTD: '9', reTD: '1', paYds: '0', ruYds: '1122', reYds: '414', selected: false, imageFile: 'rb_demarcoMurray.png' },
      {name: 'LeVeon Bell', age: 24, team: 'PIT', bye: '8', position: 'RB', qty: '1', projPts: '212', paTD: '0', ruTD: '8', reTD: '1', paYds: '0', ruYds: '1140', reYds: '378', selected: false, imageFile: 'rb_leveonBell.png' },
      {name: 'Marshawn Lynch', age: 24, team: 'SEA', bye: '5', position: 'RB', qty: '1', projPts: '188', paTD: '0', ruTD: '10', reTD: '1', paYds: '0', ruYds: '1213', reYds: '209', selected: false, imageFile: 'rb_marshawnLynch.png' },
      {name: 'Arian Foster', age: 22, team: 'HOU', bye: '6', position: 'RB', qty: '1', projPts: '197', paTD: '0', ruTD: '7', reTD: '2', paYds: '0', ruYds: '1165', reYds: '360', selected: false, imageFile: 'rb_arianFoster.png' },
      {name: 'Frank Gore', age: 23, team: 'SF', bye: '7', position: 'RB', qty: '1', projPts: '248', paTD: '0', ruTD: '8', reTD: '0', paYds: '0', ruYds: '1072', reYds: '138', selected: false, imageFile: 'rb_frankGore.png' },
      {name: 'C.J. Anderson', age: 24, team: 'DEN', bye: '6', position: 'RB', qty: '1', projPts: '254', paTD: '0', ruTD: '9', reTD: '0', paYds: '0', ruYds: '1080', reYds: '106', selected: false, imageFile: 'rb_cjAnderson.png' },
      {name: 'Demaryius Thomas', age: 25, team: 'DEN', bye: '4', position: 'WR', qty: '1', projPts: '220', paTD: '0', ruTD: '0', reTD: '13', paYds: '0', ruYds: '100', reYds: '1441', selected: false, imageFile: 'wr_demaryiusThomas.png' },
      {name: 'Julio Jones', age: 23, team: 'ATL', bye: '8', position: 'WR', qty: '1', projPts: '202', paTD: '0', ruTD: '0', reTD: '10', paYds: '0', ruYds: '0', reYds: '1392', selected: false, imageFile: 'wr_julioJones.png' },
      {name: 'Dez Bryant', age: 27, team: 'DAL', bye: '9', position: 'WR', qty: '1', projPts: '198', paTD: '0', ruTD: '0', reTD: '11', paYds: '0', ruYds: '0', reYds: '1314', selected: false, imageFile: 'wr_dezBryant.png' },
      {name: 'A.J. Green', age: 23, team: 'CIN', bye: '4', position: 'WR', qty: '1', projPts: '194', paTD: '0', ruTD: '0', reTD: '11', paYds: '0', ruYds: '0', reYds: '1315', selected: false, imageFile: 'wr_ajGreen.png' },
      {name: 'Brandon Marshall', age: 22, team: 'CHI', bye: '8', position: 'WR', qty: '1', projPts: '190', paTD: '0', ruTD: '0', reTD: '11', paYds: '0', ruYds: '0', reYds: '1264', selected: false, imageFile: 'wr_brandonMarshall.png' },
      {name: 'Jordy Nelson', age: 24, team: 'GB', bye: '8', position: 'WR', qty: '1', projPts: '185', paTD: '0', ruTD: '0', reTD: '10', paYds: '0', ruYds: '80', reYds: '1254', selected: false, imageFile: 'wr_jordyNelson.png' },
      {name: 'Alshon Jeffery', age: 24, team: 'CHI', bye: '5', position: 'WR', qty: '1', projPts: '184', paTD: '0', ruTD: '1', reTD: '9', paYds: '0', ruYds: '0', reYds: '1276', selected: false, imageFile: 'wr_alshonJeffery.png' },
      {name: 'Pierre Garcon', age: 22, team: 'WAS', bye: '6', position: 'WR', qty: '1', projPts: '155', paTD: '0', ruTD: '1', reTD: '7', paYds: '0', ruYds: '99', reYds: '1187', selected: false, imageFile: 'wr_pierreGarcon.png' },
      {name: 'Mike Evans', age: 23, team: 'TB', bye: '7', position: 'WR', qty: '1', projPts: '110', paTD: '0', ruTD: '0', reTD: '6', paYds: '0', ruYds: '0', reYds: '987', selected: false, imageFile: 'wr_mikeEvans.png' },
      {name: 'Odell Beckham Jr.', age: 24, team: 'NYG', bye: '6', position: 'WR', qty: '1', projPts: '110', paTD: '0', ruTD: '0', reTD: '5', paYds: '0', ruYds: '0', reYds: '912', selected: false, imageFile: 'wr_odellBeckham.png' },
      {name: 'Jimmy Graham', age: 25, team: 'NO', bye: '4', position: 'TE', qty: '1', projPts: '195', paTD: '0', ruTD: '0', reTD: '13', paYds: '0', ruYds: '100', reYds: '1180', selected: false, imageFile: 'te_jimmyGraham.png' },
      {name: 'Julius Thomas', age: 23, team: 'DEN', bye: '8', position: 'TE', qty: '1', projPts: '158', paTD: '0', ruTD: '0', reTD: '11', paYds: '0', ruYds: '0', reYds: '938', selected: false, imageFile: 'te_juliusThomas.png' },
      {name: 'Rob Gronkowski', age: 27, team: 'NE', bye: '9', position: 'TE', qty: '1', projPts: '148', paTD: '0', ruTD: '0', reTD: '10', paYds: '0', ruYds: '0', reYds: '916', selected: false, imageFile: 'te_robGronkowski.png' },
      {name: 'Vernon Davis', age: 23, team: 'SF', bye: '4', position: 'TE', qty: '1', projPts: '139', paTD: '0', ruTD: '0', reTD: '9', paYds: '0', ruYds: '0', reYds: '823', selected: false, imageFile: 'te_vernonDavis.png' },
      {name: 'Jason Witten', age: 22, team: 'DAL', bye: '8', position: 'TE', qty: '1', projPts: '124', paTD: '0', ruTD: '0', reTD: '7', paYds: '0', ruYds: '0', reYds: '851', selected: false, imageFile: 'te_jasonWitten.png' },
      {name: 'Jordan Cameron', age: 24, team: 'CLE', bye: '8', position: 'TE', qty: '1', projPts: '122', paTD: '0', ruTD: '0', reTD: '6', paYds: '0', ruYds: '80', reYds: '880', selected: false, imageFile: 'te_jordanCameron.png' },
      {name: 'Delanie Walker', age: 24, team: 'TEN', bye: '5', position: 'TE', qty: '1', projPts: '93', paTD: '0', ruTD: '1', reTD: '5', paYds: '0', ruYds: '0', reYds: '610', selected: false, imageFile: 'te_delanieWalker.png' },
      {name: 'Dwayne Allen', age: 22, team: 'IND', bye: '6', position: 'TE', qty: '1', projPts: '82', paTD: '0', ruTD: '1', reTD: '5', paYds: '0', ruYds: '99', reYds: '530', selected: false, imageFile: 'te_dwayneAllen.png' },
      {name: 'Garrett Graham', age: 23, team: 'HOU', bye: '7', position: 'TE', qty: '1', projPts: '75', paTD: '0', ruTD: '0', reTD: '4', paYds: '0', ruYds: '0', reYds: '505', selected: false, imageFile: 'te_garrettGraham.png' },
      {name: 'Tyler Eifert', age: 24, team: 'CIN', bye: '6', position: 'TE', qty: '1', projPts: '73', paTD: '0', ruTD: '0', reTD: '3', paYds: '0', ruYds: '0', reYds: '509', selected: false, imageFile: 'te_tylerEifert.png' },
      function() {
        Player.find(function (err, players) {
          if (err) { console.log(err); }
          else {
            console.log('Finished populating ' + players.length + ' players.');
            addPlayerToUser(players);
          }
        });
      }
    );
  });
}

function addPlayerToUser(players) {
  User.find({}).populate('team').exec(function(err, users) {
    var user1 = users[0];
    var player1 = players[0];
    var team1 = user1.team;
    var user2 = users[1];
    var player2 = players[1];
    var team2 =  user2.team;
    team1.players.push(player1);
    team2.players.push(player2);
    console.log("===> USER1: " + JSON.stringify(user1));

    Player.findById(player1._id, function(err, player1) {
      console.log("===> PLAYER: " + JSON.stringify(player1));
    });

    Player.findById(player2._id, function(err, player2) {
      console.log("===> PLAYER: " + JSON.stringify(player2));
    });

    team1.save(function() {
      console.log("===> TEAM SAVED: " + JSON.stringify(team1));
    });
    team2.save(function() {
      console.log("===> TEAM SAVED: " + JSON.stringify(team2));
    });
  });
}
