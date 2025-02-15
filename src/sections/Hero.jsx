import {PerspectiveCamera} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import HackerRoom from "../components/HackerRoom.jsx";
import {Suspense} from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
// import {Leva, useControls} from "leva";
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
// import {Leva, useControls} from "leva";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";

const Hero = () => {
    // const x = useControls('ReactLogo', {
    //
    //     positionX: {
    //         value: 2.5,
    //         min: -100,
    //         max: 100,
    //     },
    //     positionY: {
    //         value: 2.5,
    //             min: -10,
    //             max: 10,
    //     },
    //     positionZ: {
    //         value: 2.5,
    //             min: -10,
    //             max: 10,
    //     },
    //     rotationX: {
    //         value: 2.5,
    //             min: -10,
    //             max: 10,
    //     },
    //     rotationY: {
    //         value: 2.5,
    //             min: -10,
    //             max: 10,
    //     },
    //     rotationZ: {
    //         value: 2.5,
    //             min: -10,
    //             max: 10,
    //     },
    //     scale: {
    //         value: 2.5,
    //             min: -10,
    //             max: 10,
    //     }
    // });
    const isSmall = useMediaQuery({maxWidth: 440});
    const isMobile = useMediaQuery({maxWidth: 768});
    const isTablet = useMediaQuery({minWidth: 768, cmaxWidth: 1024});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    return (
        <section className={"min-h-screen border-blue-500 w-full flex relative flex-col"}>
            <div className={"w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3"}>
                <p className={"sm:text-3xl text-2xl font-medium text-white text-center font-generalsans"}>Hi, I am
                    Adrain <span className={"waving-hand"}>👋</span></p>
                <p className={"hero_tag text-gray_gradient"}>Building Products & Brands</p>
            </div>
            <div className={"w-full h-full absolute inset-0 mt-12"}>
                {/*<Leva/>*/}
                <Canvas className={"w-full h-full"}>
                    <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]}/>
                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                /*scale={0.07}*/
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0, -Math.PI, 0]}
                            />
                        </HeroCamera>
                        <group>
                            <Target position={sizes.targetPosition}/>
                            <ReactLogo position={sizes.reactLogoPosition}/>
                            {/*<ReactLogo position={[x.positionX, x.positionY, x.positionZ]} />*/}
                            <Cube position={sizes.cubePosition}/>
                            <Rings position={sizes.ringPosition}/>
                        </group>
                        <ambientLight intensity={1}/>
                        <directionalLight intensity={0.5} position={[10, 10, 10]}/>
                    </Suspense>
                </Canvas>
            </div>

            <div className={'absolute -bottom-12 left-0 right-0 w-full z-10 c-space'}>
                <a href="#about" className={'w-fit'}>
                    <Button name={"Let's Work Together"} isBeam containerClass={'sm:w-fit w-full sm:min-w-96'}/>
                </a>
            </div>
        </section>
    )
}
export default Hero
