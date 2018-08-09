    window.addEventListener('startGame', function() {
        var canvas = document.getElementById('renderCanvas');
        var engine = new BABYLON.Engine(canvas, true);

        var createScene = function () {

            var scene = new BABYLON.Scene(engine);
            var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
            var physicsPlugin = new BABYLON.CannonJSPlugin();
            var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
            var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
            skyboxMaterial.backFaceCulling = false;
            // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://media.wired.com/photos/5a593a7ff11e325008172bc2/master/pass/pulsar-831502910.jpg", scene);

            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://images.unsplash.com/photo-1533283725824-a62a971989ac?ixlib=rb-0.3.5&s=a5297cf012f7dca386b52df916133ea7&auto=format&fit=crop&w=1350&q=80", scene);
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            skyboxMaterial.disableLighting = true;
            skybox.material = skyboxMaterial;	

            scene.enablePhysics(gravityVector, physicsPlugin);
            // This creates a basic Babylon Scene object (non-mesh)
            
            

        // Parameters: alpha, beta, radius, target position, scene
            var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
        
        // Positions the camera overwriting alpha, beta, radius
            camera.setPosition(new BABYLON.Vector3(0, 15, 35));
        
        // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
        
            // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
            light.diffuse = new BABYLON.Color3(1, 1, 1);
            light.specular = new BABYLON.Color3(1, 1, 1);
            light.groundColor = new BABYLON.Color3(0, 0, 0);
            // Default intensity is 1. Let's dim the light a small amount
            light.intensity = 1;
            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
            // vars
            var color = new BABYLON.Color4(1, 1, 1, 0);
            var crapsGreen = new BABYLON.Color3(0.0078, 0.666 , 0.5); 
            var wallColor = new BABYLON.Color4(.75, 0, .75, 0.1);
        
        
            var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", 
                {faceColors: [
                    wallColor, wallColor, wallColor, wallColor, wallColor, wallColor
                    ],
                    width: 29,
                    height: 5,
                    depth: .5
                }, scene);
            var wall2 = BABYLON.MeshBuilder.CreateBox("wall2", 
            {faceColors: [
                wallColor, wallColor, wallColor, wallColor, wallColor, wallColor
                ],
                width: 29,
                height: 5,
                depth: .5
            }, scene);
            var wall3 = BABYLON.MeshBuilder.CreateBox("wall3", 
            {faceColors: [
                wallColor, wallColor, wallColor, wallColor, wallColor, wallColor
                ],
                width: 30,
                height: 5,
                depth: .5
            }, scene);
            var wall4 = BABYLON.MeshBuilder.CreateBox("wall4", 
            {
                faceColors: [wallColor, wallColor, wallColor, wallColor, wallColor, wallColor],
                width: 30,
                height: 5,
                depth: .5
            }, scene);
        
            wall1.position.z = 15;
            wall2.position.z = -15;
            wall3.position.x = 15;
            wall4.position.x = -15;
            wall3.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);
            wall4.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);
            wall1.position.y = 2.5;
            wall2.position.y = 2.5;
            wall3.position.y = 2.5;
            wall4.position.y = 2.5;
        
            var mat = new BABYLON.StandardMaterial("mat", scene);
            var texture = new BABYLON.Texture("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn-BCtRet1-tSf_gvZVJcDKMcGcp88hmHgoHe4tCvNEGizR4yO0Q", scene);
            mat.diffuseTexture = texture;
        
            var columns = 6;  // 6 columns
            var rows = 1;  // 4 rows
        
            var faceUV = new Array(6);
        
            for (var i = 0; i < 6; i++) {
                faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
            }
        
        
            var box1 = BABYLON.MeshBuilder.CreateBox("box1", 
                {
                    width: 2,
                    height: 2,
                    depth: 2,
                    faceUV: faceUV
                }, scene);
            var box2 = BABYLON.MeshBuilder.CreateBox("box2", {
                width: 2,
                height: 2,
                depth: 2,
                faceUV: faceUV
            }, scene);
            // Move the sphere upward 1/2 its height
            box1.position.y = .5;
            box1.position.x = -5;
            box1.position.z = -5;
        
        
            box2.position.y = .5;
            box2.position.x = 5;
            box2.position.z = 5;
        
            box1.material = mat;
            box2.material = mat;
            
        
            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
            var ground = BABYLON.Mesh.CreateGround("ground1", 31,31,0, scene);
            var groundMaterial = new BABYLON.StandardMaterial(scene);
            groundMaterial.alpha = 1;
            groundMaterial.diffuseColor = new BABYLON.Color3(0.0078, 0.666 , 0.5);
            ground.material = groundMaterial;
        
            ground.actionManager = new BABYLON.ActionManager(scene);
            
        
            scene.enablePhysics(gravityVector, physicsPlugin);
        
            box1.physicsImpostor = new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
            box2.physicsImpostor = new BABYLON.PhysicsImpostor(box2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
        
            wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1000, restitution: 0.9 }, scene);
            wall2.physicsImpostor = new BABYLON.PhysicsImpostor(wall2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1000, restitution: 0.9 }, scene);
            wall3.physicsImpostor = new BABYLON.PhysicsImpostor(wall3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1000, restitution: 0.9 }, scene);
            wall4.physicsImpostor = new BABYLON.PhysicsImpostor(wall4, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1000, restitution: 0.9 }, scene);
        
            function setMovementToZero(obj){
                obj.setAngularVelocity = 0;
                obj.setLinearVelocity = 0;
            }
        
            setMovementToZero(wall1.physicsImpostor);
            setMovementToZero(wall2.physicsImpostor);
            setMovementToZero(wall3.physicsImpostor);
            setMovementToZero(wall4.physicsImpostor);
        
            function angularVelocityIsLessThan(mesh, threshold) {
                return ( 
                    mesh.physicsImpostor.getAngularVelocity().x < threshold && 
                    mesh.physicsImpostor.getAngularVelocity().y < threshold && 
                    mesh.physicsImpostor.getAngularVelocity().z < threshold
                );
            }
        
            function linearVelocityIsLessThan(mesh, threshold) {
                return ( 
                    mesh.physicsImpostor.getLinearVelocity().x < threshold && 
                    mesh.physicsImpostor.getLinearVelocity().y < threshold && 
                    mesh.physicsImpostor.getLinearVelocity().z < threshold
                );
            }
        
            function getFaceUp(mesh, threshold) {
                for (var i = 0; i < 12; i++ ){
                    if (Math.abs(mesh.getFacetNormal(i).y - 1) < .5) {
                        console.log('You rolled a ' + facetsToDiceNumber(i));
                        break;
                    }
                }
            }
        
            function facetsToDiceNumber(facet){
                var diceNumber = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
                return diceNumber[facet]
            }
        
            function isMoving(meshes, threshold){
                    var interval = setInterval(function(){
                    if(
                        meshes.every(function(mesh){
                        return (linearVelocityIsLessThan(mesh, threshold) && angularVelocityIsLessThan(mesh, threshold))
                        }) 
                    ) {
                        console.log('stopped');
                        meshes.forEach(function(mesh){
                            getFaceUp(mesh);
                        });
                        clearInterval(interval);
                    } else console.log('moving');
                },100);
            }
            box1.physicsImpostor.getAngularVelocity();
            box1.physicsImpostor.getLinearVelocity();
        
            ground.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnPickTrigger,
                        parameter: 'r'
                    },
                    function() {
                        box1.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(8 * (Math.random() - Math.random()),8,8 * (Math.random() - Math.random())));
                        box2.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(8 * (Math.random() - Math.random()),8,8 * (Math.random() - Math.random())));
                        box1.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(15 * (Math.random() - Math.random()),15 * (Math.random() - Math.random()),15 * (Math.random() - Math.random())));
                        box2.physicsImpostor.setAngularVelocity(new BABYLON.Vector3(15 * (Math.random() - Math.random()), 15 * (Math.random() - Math.random()), 15 * (Math.random() - Math.random())));;
                        
                        isMoving([box2, box1], 0.1);
                    }
                )        
            );
        
            ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        
            return scene;
        
        };


        var scene = createScene();
        engine.runRenderLoop(function() {
            scene.render();
        });
    });
