<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
       <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td></td>
          <td
            width="800"
            height="800"
            class="the_wheel"
            align="center"
            valign="center"
          >
            <canvas id="canvas" width="780" height="780">
              <p
                style="
                   {
                    color: white;
                  }
                "
                align="center"
              >
                Sorry, your browser doesn't support canvas. Please try another.
              </p>
            </canvas>
            <div id="spin" onClick="startSpin()">QUAY</div>
          </td>
        </tr>
      </table>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
const Winwheel = require('~/assets/Winwheel')

//  let prizeList = [
//         { image: "../assets/jane.png", text: "Jane", chance: 0, stt: 1 },
//         { image: "../assets/tom.png", text: "Tom", chance: 0, stt: 2 },
//         { image: "../assets/mary.png", text: "Mary", chance: 0, stt: 3 },
//         { image: "../assets/alex.png", text: "Alex", chance: 0, stt: 4 },
//         { image: "../assets/sarah.png", text: "Sarah", chance: 0, stt: 5 },
//         { image: "../assets/bruce.png", text: "Bruce", chance: 50, stt: 6 },
//         { image: "../assets/rose.png", text: "Rose", chance: 50, stt: 7 },
//         { image: "../assets/steve.png", text: "Steve", chance: 0, stt: 8 },
//       ];
//       // Create new wheel object specifying the parameters at creation time.
//       let theWheel = new Winwheel({
//         numSegments: 8, // Specify number of segments.
//         outerRadius: 200, // Set outer radius so wheel fits inside the background.
//         drawText: true, // Code drawn text can be used with segment images.
//         textFontSize: 16,
//         textOrientation: "curved",
//         textAlignment: "inner",
//         textMargin: 90,
//         textFontFamily: "monospace",
//         textStrokeStyle: "black",
//         textLineWidth: 3,
//         textFillStyle: "white",
//         drawMode: "segmentImage", // Must be segmentImage to draw wheel using one image per segemnt.
//         // Define segments including image and text.
//         segments: prizeList,
//         // Specify the animation to use.
//         animation: {
//           type: "spinToStop",
//           duration: 5, // Duration in seconds.
//           spins: 8, // Number of complete spins.
//           callbackFinished: alertPrize,
//         },
//       });

//       let wheelPower = 0;
//       let wheelSpinning = false;

//       function startSpin() {
//         var disabledButtonClass = document.getElementsByClassName(
//           "disabled-button"
//         );
//         var spinAgainButtonClass = document.getElementsByClassName(
//           "spin-again"
//         );
//         if (
//           spinAgainButtonClass.length > 0 &&
//           document.getElementById("spin").innerHTML == "QUAY LẠI"
//         ) {
//           document.getElementById("spin").innerHTML = "QUAY";
//           var element = document.getElementById("spin");
//           element.classList.remove("disabled-button");
//           element.classList.remove("spin-again");
//           theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
//           theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
//           theWheel.draw();
//         } else if (
//           disabledButtonClass.length == 0 &&
//           spinAgainButtonClass.length == 0
//         ) {
//           const expanded = prizeList.flatMap((prize) =>
//             Array(prize.chance).fill(prize)
//           );
//           const prizeSelected =
//             expanded[Math.floor(Math.random() * expanded.length)];
//           if (wheelSpinning == false) {
//             theWheel.animation.spins = 15;
//             document.getElementById("spin").className = "disabled-button";
//             calculatePrize(prizeSelected.stt);
//           }
//         }
//       }
//       function calculatePrize(prizeStt) {
//         console.log(prizeStt);
//         var stopAt = theWheel.getRandomForSegment(prizeStt);
//         theWheel.animation.stopAngle = stopAt;
//         theWheel.startAnimation();
//       }
//       function resetWheel() {
//         theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
//         theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
//         theWheel.draw(); // Call draw to render changes to the wheel.

//         wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
//       }
//       function alertPrize(indicatedSegment) {
//         // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
//         document.getElementById("spin").innerHTML = "QUAY LẠI";
//         document.getElementById("spin").classList.remove("disabled-button");
//         document.getElementById("spin").className = "spin-again";
//       }

export default {
  components: {
    Logo,
    VuetifyLogo,
    Winwheel,
  },
  mounted () {
    console.log('aaaaaa', this.Winwheel)
  }
}
</script>
<style>

body {
  font-family: arial;
}

td.the_wheel {
  background-image: url(../assets/wheel_back.png);
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

h1,
p {
  margin: 0;
}

div.power_controls {
  margin-right: 70px;
}

div.html5_logo {
  margin-left: 70px;
}

/* Styles for the power selection controls */
table.power {
  background-color: #cccccc;
  cursor: pointer;
  border: 1px solid #333333;
}

table.power th {
  background-color: white;
  cursor: default;
}

td.pw1 {
  background-color: #6fe8f0;
}

td.pw2 {
  background-color: #86ef6f;
}

td.pw3 {
  background-color: #ef6f6f;
}

/* Style applied to the spin button once a power has been selected */
.clickable {
  cursor: pointer;
}

/* Other misc styles */
.margin_bottom {
  margin-bottom: 5px;
}
#spin::after {
  content: "";
  position: absolute;
  top: -24px;
  border: 20px solid transparent;
  border-bottom-color: currentColor;
  border-top: none;
}
#spin {
  font: 1.8em/0 sans-serif;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 52%;
  left: 52%;
  width: 210px;
  height: 210px;
  margin: -15%;
  background: #ff6328;
  color: #fff;
  box-shadow: 0 0 0 8px currentColor, 0 0px 15px 5px rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  transition: 0.8s;
}
#spin:hover{
    background: #ff9068;
}
.disabled-button{
    background: #999999!important;
    color: grey!important;
}
.spin-again{
    background: #999999!important;
    color: white!important;
}
</style>
