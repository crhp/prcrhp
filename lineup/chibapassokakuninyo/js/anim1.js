var collora = collora || {};

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame ||
        window.cancelRequestAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        function(id) { window.clearTimeout(id); };
}());


(function(namespace) {

    /* =========================================================
      
     Particle
     
    ========================================================= */
    var Particle = (function() {
        var Vec2D = toxi.geom.Vec2D;
        var center = new Vec2D(200, 200);

        var Arc = collora.Arc;

        function Particle(loc) {
            this.loc = loc;
            this.radius = 0;
            this.color = undefined;
        }

        Particle.prototype.draw = function(ctx) {
            this.drawCircle(ctx);

        };
        Particle.prototype.drawCircle = function(ctx) {
            ctx.beginPath();

            ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2, true);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        namespace.Particle = Particle;
        return Particle;
    }());
    namespace.Particle = Particle;


    /* =========================================================
      
     Animation1
     
    ========================================================= */
    var Animation1 = (function() {
        var Vec2D = toxi.geom.Vec2D;
        function Animation1(dom) {
            this.dom = dom;
            var icon = this.dom.find(".ico img");
            var num = this.dom.find(".num img");
            var title = this.dom.find(".title img");
            TweenMax.to(icon, 0, { y: 15 });
            TweenMax.to(num, 0, { y: 37 });
             title.each(function(index, el) {
                TweenMax.to(el, 0, { y: -45 })
            });
        }


        Animation1.prototype.anim = function() {
            var canvas = this.dom.find("canvas")[0];
            var ctx = canvas.getContext("2d");
            var icon = this.dom.find(".ico img");
            var num = this.dom.find(".num img");
            var title = this.dom.find(".title img");
            var color = this.dom.find(".ico_point_anim").attr("data-color");
            var radius = 32;
            var isComp = false;

            var Particle = collora.Particle;
            var numParticle = 6;
            var particles = [];
            var dist = 130;
            var duration = 0.45;
            var compCount = 0;
            var x = canvas.offsetWidth / 2;
            var y = canvas.offsetHeight / 2;

            var centerVec = new Vec2D(x, y);
 
            var loc = new Vec2D(x, y);
            var defY = loc.y;

            var tmploc = new Vec2D(loc.x + dist, loc.y);
            var center = tmploc.sub(centerVec).scale(0.5).add(centerVec);

            center.y += 100;
            //center.x -= 130;


            for (var i = 0; i < numParticle; i++) {
                var angle = 360 * i / numParticle;
                var radian = angle * Math.PI / 180;
                var x = dist * Math.cos(radian) + centerVec.x;
                var y = dist * Math.sin(radian) + centerVec.y;
                var loc = new Vec2D(x, y);

                var tmpCenter = rotate(center.x, center.y, centerVec.x, centerVec.y, -angle);
                var particle = new Particle(loc);
                particle.radius = 0;
                particle.color = color;
                particles.push(particle);

                // if(i<numParticle-1) continue;

                TweenMax.to(particle.loc, duration, { delay: 0, bezier: { type: "quadratic", values: [{ x: loc.x, y: loc.y }, { x: tmpCenter.x, y: tmpCenter.y }, { x: centerVec.x, y: centerVec.y }] }, ease: Power1.easeOut });

                TweenMax.to(particle, duration, { delay: 0, radius: radius*0.2, ease: Power3.easeOut, onComplete: checkAnimComp });
                // TweenMax.to(particle.loc,duration,{delay:i*0.02,x:200,y:200,onComplete:checkAnimComp});

            };


            //centerParticle.radius = 20;
            var centerParticle = new Particle(new Vec2D(centerVec.x, centerVec.y));
            TweenMax.to(centerParticle, 0.3, { radius: radius,delay:0.4, ease: Power2.easeOut })
            function checkAnimComp() {

                if (compCount == numParticle - 1) {
                    TweenMax.to(icon, 0.2, { y: 0 });
                    TweenMax.to(num, 0.2, { y: 0 });
                    centerParticle.radius = radius;
                    for (var i = 0; i < numParticle; i++) {
                        particles[i].radius = 0;

                    };
                  
                    title.each(function(index, el) {
                        TweenMax.to(el, 0.3, { y: 0,delay:0.2, ease: Power2.easeOut })
                    });
                    isComp = true;

                }
                compCount++;
            }

            function rotate(tx, ty, ox, oy, tr) {
                var distX = tx - ox;
                var distY = ty - oy;
                var rad = tr / 180 * Math.PI;
                var cos = Math.cos(rad);
                var sin = Math.sin(rad);
                var posX = distX * cos + distY * sin + ox;
                var posY = -distX * sin + distY * cos + oy;
                var point = { x: posX, y: posY };
                return point;

            }



            function loop() {
                window.requestAnimationFrame(loop);

                clear();
                if(!isComp){
                    for (var i = 0; i < numParticle; i++) {
                        var particle = particles[i];
                        particle.draw(ctx);
                    };    
                }
                

                centerParticle.draw(ctx);


            }

            function clear() {
                ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
            }

            loop();
        }

        namespace.Animation1 = Animation1;
        return Animation1;
    }());
    namespace.Animation1 = Animation1;

}(collora));


jQuery(document).ready(function($) {
    // var Animation1 = collora.Animation1;
  
    // var anim = new Animation1($("#point1"));
    // anim.anim();

});