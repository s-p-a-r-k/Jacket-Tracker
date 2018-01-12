INSERT INTO TYPE(TypeName) VALUES ("Jacket"),("Sash"),("Bibbers"),("Vest"),("Shako");

INSERT INTO SIZE(TypeName,Size) VALUES("Shako","Small"),("Shako","Medium"),("Shako","Large"),("Jacket","Small"),("Jacket","Medium"),("Jacket","Large"),("Sash","Small"),("Sash","Medium"),("Sash","Large"),("Bibbers","Small"),("Bibbers","Medium"),("Bibbers","Large"),("Vest","Small"),("Vest","Medium"),("Vest","Large");

INSERT INTO STATUS(StatusName) VALUES("Good"),("Dirty"),("Broken"),("Missing");

INSERT INTO INSTRUMENT(InstrumentName) VALUES("Piccolo"),("Clarinet"),("Alto_Saxophone"),("Tenor_Saxophone"),("Trumpet"),("Trombone"),("Mellophone"),("Baritone"),("Tuba"),("Bass_Drum"),("Snare_Drum"),("Quads"),("Cymbals"),("Front_Ensemble"),("Drum_Major");


INSERT INTO STUDENT(Email, GTID, FirstName, LastName, Is_Lieutenant, InstrumentName) VALUES("pparker123@gatech.edu","903000000","Peter","Parker",FALSE,"Piccolo"),("anuj6@gatech.edu","903000031","Anuj","Bhyravabhotla",FALSE,"Trumpet"),("ckent@gatech.edu", "903000502","Clark","Kent",TRUE,"Bass_Drum"),("tstark343@gatech.edu","903070003","Tony","Stark",FALSE, "Clarinet"),("blieut@gatech.edu","903900004","Band","Lieut",TRUE,"Trombone"),("hfin@gatech.edu", "903999999","Huckleberry","Finn",TRUE,"Baritone");

INSERT INTO LIEUTENANT(Email, Password, Username) VALUES("blieut@gatech.edu","1234","lieutenant1"),("hfin@gatech.edu","1234","lieutenant2"),("ckent@gatech.edu","1234","lieutenant3");

INSERT INTO UNIFORM(Email, TypeName, UniformID, Size, StatusName, Notes) VALUES("anuj6@gatech.edu","Jacket","33","Small","Good","N/A"),("anuj6@gatech.edu","Bibbers","18","Small","Good","N/A"),("anuj6@gatech.edu","Sash","12","Medium","Good","N/A"),("anuj6@gatech.edu","Shako","S365","Small","Good","N/A"),("tstark343@gatech.edu","Jacket","11","Medium","Good","N/A"),("tstark343@gatech.edu","Bibbers","79","Small","Missing","Don't care"),("tstark343@gatech.edu","Sash","44","Large","Good","N/A"),("tstark343@gatech.edu","Shako","M111","Medium","Good","N/A"),("ckent@gatech.edu","Jacket","22","Large","Dirty","N/A"),("ckent@gatech.edu","Bibbers","120","Large","Good","N/A"),("ckent@gatech.edu","Shako","L4","Large","Good","N/A");

INSERT INTO UNIFORM(TypeName, UniformID, Size, StatusName, Notes) VALUES("Vest","52","Medium","Broken","Replacement ordered");


INSERT INTO GROUPS(GroupName) VALUES("Basketball"),("Football"),("Orientation");

INSERT INTO GROUP_MEMBERS(GroupName, Email) VALUES("Basketball","anuj6@gatech.edu"),("Basketball","ckent@gatech.edu"),("Basketball","tstark343@gatech.edu"),("Football","pparker123@gatech.edu"),("Football","anuj6@gatech.edu"),("Football","ckent@gatech.edu"),("Football","tstark343@gatech.edu"),("Football","blieut@gatech.edu"),("Football","hfin@gatech.edu"),("Orientation","pparker123@gatech.edu"),("Orientation","anuj6@gatech.edu"),("Orientation","ckent@gatech.edu"),("Orientation","tstark343@gatech.edu"),("Orientation","blieut@gatech.edu"),("Orientation","hfin@gatech.edu");

INSERT INTO EMAIL(Title, Content) VALUES("Missing_Pieces","Please return the missing pieces by Wednesday!"),("Ready_For_Pickup","Your uniform is ready for pickup.  Please stop by the Uniforms office before or after rehearsal to pick it up");

