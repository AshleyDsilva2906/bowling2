AFRAME.registerComponent('ball',{

    init:function(){
        this.throwBalls()
    },

    throwBalls:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key==='b'){
                var ball=document.createElement('a-entity')
                ball.setAttribute('geometry',{
                    primitive:'sphere',
                    radius:'2',
                })
                ball.setAttribute('material','color','black')
                ball.setAttribute('scale',{x:0.1,y:0.1,z:0.1})
                var camera=document.querySelector('#camera')
                var pos=camera.getAttribute('position')
                posY=pos.y
                ball.setAttribute('position',{x:pos.x,y:pos.y,z:pos.z})
                var cam=document.querySelector('#camera').object3D
                var dir=new THREE.Vector3()
                cam.getWorldDirection(dir)
                ball.setAttribute('velocity',dir.multiplyScalar(-10))
                ball.setAttribute('velocity',{
                    x:0,
                    y:0,
                    z:-1
                })
                var scene=document.querySelector('#scene')
                ball.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: "10",
                  });
                ball.addEventListener("collide", this.removeBall);
                scene.appendChild(ball)
            }
        })
    },
    removeBall: function (e) {
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        if (elementHit.id.includes("pin")) {
          var impulse = new CANNON.Vec3(0,7,-20);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
          elementHit.body.applyForce(impulse, worldPoint);
          element.removeEventListener("collide", this.removeBall);
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
    
})

