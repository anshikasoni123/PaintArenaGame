AFRAME.registerComponent("shoot",{
    init:function(){
        this.shootBullet();
    },
    shootBullet:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var bullet = document.createElement('a-entity');
                bullet.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.1
                });
                bullet.setAttribute("material","color","black");
                 var cam = document.querySelector("#camera");
                 pos = cam.getAttribute("position");

                 bullet.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z});

                 var camera = document.querySelector("#camera").object3D;

                 var direction = new THREE.Vector3();
                 camera.getWorldDirection(direction);

                 bullet.setAttribute("velocity",direction.multiplyScalar(-10));
                 bullet.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:0
                 });
                 bullet.addEventListener('collide',this.removeBullet);
                 var scene = document.querySelector("#scene");
                 scene.appendChild(bullet);

                 this.shootSound();
            }
        })
    },
    removeBullet:function(e){
         var targetEl = e.detail.target.el;
         var hitEl = e.detail.body.el;

         if(hitEl.id.includes("paintwall")){
            targetEl.removeEventListener("collide",this.removeBullet);
            var splash = documnet.createElement("a-entity");
           
            splash.setAttribute("geometry",{
                primitive:"sphere",
                radius:1
            })
            pos = targetEl.getAttribute("position");
            splash.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
            var scene = document.querySelector("#scene");
            scene.removeChild(targetEl)
         }
    },
    shootSound:function(){
           var entity = document.querySelector("#sound1");
           entity.components.sound.playSound();
    }
})