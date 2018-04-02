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
       name: "",
       destination: "",
       frequency: '',
       arrival_time: "" ,
       min_remain: "",
       date_entered: ""
     };
     tlist = $("#train-list");
     tlist.empty();


        var dataRef = firebase.database();
    
        // // Initial Values
        // var name = "";
        // var destinaton = "";
        // var age = 0;
        // var comment = "";
    
        // Capture Button Click
        $("#submit-btn").on("click", function(event) {
          event.preventDefault();
    
          // YOUR TASK!!!
          // Code in the logic for storing and retrieving the most recent user.
          // Don't forget to provide initial data to your Firebase database.
          train.name = $("#input-name").val().trim();
          train.destination = $("#input-destination").val().trim();
          train.arrival_time = $("#input-time").val().trim();
          train.frequency = $("#input-frequency").val().trim();
          train.min_remain = 100;
          train.date_entered = firebase.database.ServerValue.TIMESTAMP;
    
          // Code for the push
          // dataRef.ref().push({
          dataRef.ref(train.name+"-"+train.arrival_time).set({
    
            name: train.name,
            destination: train.destination,
            arrival_time: train.arrival_time,
            frequency: train.frequency,
            min_remain: train.min_remain,
            date_entered: firebase.database.ServerValue.TIMESTAMP
          });
        });
    
        // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")

        dataRef.ref().on("child_changed", function(childSnapshot) {
          console.log("chnaged="+ childSnapshot.val());
          console.log( train.name = childSnapshot.val().name);
          console.log( train.destination = childSnapshot.val().destination);
          console.log( train.arrival_time = childSnapshot.val().arrival_time);
          console.log( train.frequency = childSnapshot.val().frequency);
          console.log( train.min_remain = childSnapshot.val().min_remain);
          console.log( train.date_entered = childSnapshot.val().date_entered);
        });


        dataRef.ref().on("child_added", function(childSnapshot) {
    
          // Log everything that's coming out of snapshot
          console.log( train.name = childSnapshot.val().name);
          console.log( train.destination = childSnapshot.val().destination);
          console.log( train.arrival_time = childSnapshot.val().arrival_time);
          console.log( train.frequency = childSnapshot.val().frequency);
          console.log( train.min_remain = childSnapshot.val().min_remain);
          console.log( train.date_entered = childSnapshot.val().date_entered);

          addTrain2display(train)
    
          // full list of items to the well
          // $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
          //   " </span><span class='member-email'> " + childSnapshot.val().email +
          //   " </span><span class='member-age'> " + childSnapshot.val().age +
          //   " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");
    
        // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });
    
        dataRef.ref().orderByChild("ate_entered").limitToLast(1).on("child_added", function(snapshot) {
    
          // Change the HTML to reflect
          $("#name-display").text(snapshot.val().name);
          $("#email-display").text(snapshot.val().email);
          $("#age-display").text(snapshot.val().age);
          $("#comment-display").text(snapshot.val().comment);
        });

        function addTrain2display(train){
          tr = $("<tr>");
          td = "";
          list = $("#train-list");

          td = $("<td>");
          td.text(train.name);
          tr.append(td);

          td = $("<td>");
          td.text(train.destination);
          tr.append(td);

          td = $("<td>");
          td.text(train.arrival_time);
          tr.append(td);

          td = $("<td>");
          td.text(train.frequency);
          tr.append(td);

          td = $("<td>");
          td.text(train.min_remain);
          tr.append(td);

          list.append(tr);

        };
