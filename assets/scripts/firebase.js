      // Initialize Firebase -- my key 
      var config = {
        apiKey: "AIzaSyC4X-5mgXVKuboh0gBRmfQrdpNhc0kX73k",
        authDomain: "test-project-1-a4cde.firebaseapp.com",
        databaseURL: "https://test-project-1-a4cde.firebaseio.com",
        projectId: "test-project-1-a4cde",
        storageBucket: "test-project-1-a4cde.appspot.com",
        messagingSenderId: "268327139746"
      };
      firebase.initializeApp(config);

      var train = {
        id: "",
        name: "",
        destination: "",
        station: "",
        frequency: '',
        arrival_time: "",
        min_remain: "",
        date_entered: ""
      };
      var tlist = $("#train-list");
      tlist.empty();


      var dataRef = firebase.database();

      // // Initial Values
      // var name = "";
      // var destinaton = "";
      // var age = 0;
      // var comment = "";

      // Capture Button Click
      $("#submit-btn").on("click", function (event) {
        event.preventDefault();

        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        train.id = $("#input-id").val().trim();
        train.name = $("#input-name").val().trim();
        train.station = $("#input-station").val().trim();
        train.destination = $("#input-destination").val().trim();
        train.first_time = $("#input-time").val().trim();
        train.arrival_time = "?";
        train.frequency = $("#input-frequency").val().trim();
        train.min_remain = "?";
        train.date_entered = firebase.database.ServerValue.TIMESTAMP;

        // Code for the push
        // dataRef.ref().push({
        dataRef.ref(train.id).set({

          id: train.id,
          name: train.name,
          station: train.station,
          destination: train.destination,
          first_time: train.first_time,
          arrival_time: train.arrival_time,
          frequency: train.frequency,
          min_remain: train.min_remain,
          date_entered: firebase.database.ServerValue.TIMESTAMP
        });
      });

      // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")

      dataRef.ref().on("child_changed", function (childSnapshot) {
        console.log("changed=" + childSnapshot.val());
        console.log(train.id = childSnapshot.val().id);
        console.log(train.name = childSnapshot.val().name);
        console.log(train.station = childSnapshot.val().station);
        console.log(train.destination = childSnapshot.val().destination);
        console.log(train.first_time = childSnapshot.val().first_time);
        console.log(train.arrival_time = childSnapshot.val().arrival_time);
        console.log(train.frequency = childSnapshot.val().frequency);
        console.log(train.min_remain = childSnapshot.val().min_remain);
        console.log(train.date_entered = childSnapshot.val().date_entered);
        updateTrainDisplay(train);
      });


      dataRef.ref().on("child_added", function (childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log("added=" + childSnapshot.val());
        console.log(train.id = childSnapshot.val().id);
        console.log(train.name = childSnapshot.val().name);
        console.log(train.station = childSnapshot.val().station);
        console.log(train.destination = childSnapshot.val().destination);
        console.log(train.first_time = childSnapshot.val().first_time);
        console.log(train.arrival_time = childSnapshot.val().arrival_time);
        console.log(train.frequency = childSnapshot.val().frequency);
        console.log(train.min_remain = childSnapshot.val().min_remain);
        console.log(train.date_entered = childSnapshot.val().date_entered);

        addTrain2display(train)

        // full list of items to the well
        // $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
        //   " </span><span class='member-email'> " + childSnapshot.val().email +
        //   " </span><span class='member-age'> " + childSnapshot.val().age +
        //   " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");

        // Handle the errors
      }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

      dataRef.ref().on("child_removed", function (childSnapshot) {
        var id_local = "";
        console.log("child_removed=" + childSnapshot.val());
        console.log(id_local = childSnapshot.val().id);
        var rowid = $("#" + id_local + "-row");
        rowid.remove();
        // Handle the errors
      }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

      // dataRef.ref().orderByChild("date_entered").limitToLast(1).on("child_added", function (snapshot) {

      //   // Change the HTML to reflect
      //   $("#name-display").text(snapshot.val().name);
      //   $("#email-display").text(snapshot.val().email);
      //   $("#age-display").text(snapshot.val().age);
      //   $("#comment-display").text(snapshot.val().comment);
      // });

      ctime();

      function ctime() {
        // Current Time
        var currentTime = moment();
        var ctime = $("#ctime");
        var str = "CURRENT TIME: " + moment(currentTime).format("hh:mm A");
        ctime.text(str);

      }

      function updateTrainDisplay(train) {

        var e = "";
        timeCalc(train);

        e = $("#" + train.id);
        e.text(train.id);
        e = $("#" + train.id + "-name");
        e.text(train.name);
        e = $("#" + train.id + "-station");
        e.text(train.station);
        e = $("#" + train.id + "-destination");
        e.text(train.destination);
        e = $("#" + train.id + "-frequency");
        e.text(train.frequency);
        e = $("#" + train.id + "-arrival-time");
        e.text(train.arrival_time);
        e = $("#" + train.id + "-min-remain");
        e.text(train.min_remain);
      }


      function addTrain2display(train) {

        timeCalc(train);

        tr = $("<tr>");
        tr.attr("id", train.id + "-row");
        td = "";
        s = "";
        b = "";
        list = $("#train-list");

        td = $("<td>");
        td.text(train.id);
        td.attr("id", train.id);
        tr.append(td);

        td = $("<td>");
        td.text(train.name);
        td.attr("id", train.id + "-name");
        tr.append(td);

        td = $("<td>");
        td.text(train.station);
        td.attr("id", train.id + "-station");
        tr.append(td);

        td = $("<td>");
        td.text(train.destination);
        td.attr("id", train.id + "-destination");
        tr.append(td);

        td = $("<td>");
        td.text(train.frequency);
        td.attr("id", train.id + "-frequency");
        tr.append(td);

        td = $("<td>");
        td.text(train.arrival_time);
        td.attr("id", train.id + "-arrival-time");
        tr.append(td);

        td = $("<td>");
        td.text(train.min_remain);
        td.attr("id", train.id + "-min-remain");
        tr.append(td);

        td = $("<td>");
        b = $("<button>");
        b.attr("class", "close remove-me");
        b.attr("data-dismiss", "modal");
        // b.attr("aria-label","Close");
        b.attr("train_id", train.id);

        s = $("<span>");
        s.attr("aria-hidden", "true");
        // s.text("&times;");
        s.text("X");
        b.append(s);
        td.append(b);
        // td.text("<span aria-hidden='true' class='remove' train_id='" + train.id + "'>&times;</span>");
        // td.attr("id", train.id + "-" + train.min_remain);
        tr.append(td);

        list.append(tr);

      };

      $(document).on("click", ".remove-me", function (e) {
        e.stopPropagation();
        var id = $(this).attr("train_id");
        dataRef.ref(id).remove();
        //  var rowid = $("#"+id+"-row");
        //  rowid.remove();


      });

      function timeCalc(train) {
        // Assumptions
        var tFrequency = train.frequency;

        // Time is 3:30 AM
        var firstTime = train.first_time;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        train.min_remain = tMinutesTillTrain;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        train.arrival_time = moment(nextTrain).format("hh:mm A");
      }