import {Canvas, useThree} from "@react-three/fiber";
import {workExperiences} from "../constants/index.js";
import {OrbitControls, PerformanceMonitor} from "@react-three/drei";
import {Suspense, useEffect, useState} from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import Developer from "../components/Developer.jsx";
import round from "lodash/round.js";

const Experience = ({isMobile}) => {
    const [animationName, setAnimationName] = useState('idle');
    const UnloadModels = () => {
        Developer?.geometry?.dispose();
        Developer?.material?.dispose();

        return null;
    }

    const [dpr, setDpr] = useState(1.5);

    function AdaptivePixelRatio() {
        const current = useThree((state) => state.performance.current)
        const setPixelRatio = useThree((state) => state.setDpr)
        useEffect(() => {
            setPixelRatio(window.devicePixelRatio * current)
        }, [current])
        return null
    }

    return (
        <section className={'c-space my-20'}>
            <div className={'w-full text-white-600'}>
                <h3 className={'head-text'}>
                    My Work Experience
                </h3>
                <div className={'work-container'}>
                    <div className={'work-canvas hidden md:block'}>
                        {isMobile ? UnloadModels() : (
                            <Canvas frameloop={isMobile ? 'demand' : 'always'} dpr={dpr}>
                                <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}
                                                    onChange={({factor}) => setDpr(round(0.5 + 1.5 * factor, 1))}>
                                    <ambientLight intesity={20}/>
                                    <spotLight position={[10, 10, 10]} angle={0.15} penubra={1}/>
                                    <directionalLight position={[10, 10, 10]} intensity={5}/>
                                    <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2}/>
                                    <Suspense fallback={<CanvasLoader/>}>
                                        <AdaptivePixelRatio pixelRatio={Math.min(window.devicePixelRatio, 2)}/>
                                        <Developer position-y={-3} scale={3}
                                                   animationName={animationName} rotation={[Math.PI / 12, 0, 0]}/>
                                    </Suspense>
                                </PerformanceMonitor>
                            </Canvas>
                        )}
                    </div>
                    <div className={'work-content'}>
                        <div className={'sm:py-10 py-5 sm:px-5 px-2.5'}>
                            {workExperiences.map(({id, name, pos, title, animation, duration, icon}) => (
                                <div key={id} className={'work-content_container group'}
                                     onClick={() => setAnimationName(animation.toLowerCase())}
                                     onPointerOver={() => setAnimationName(animation.toLowerCase())}
                                     onPointerOut={() => setAnimationName('idle')}>
                                    <div className={'flex flex-col h-full justify-center items-center py-2'}>
                                        <div className={'work-content_logo'}>
                                            <img src={icon} alt={name} className={'w-full h-full'}/>
                                        </div>
                                        <div className={'work-content_bar'}/>
                                    </div>
                                    <div className={'sm:p-5 py-5 px-2.5'}>
                                        <p className={'font-bold text-white-800'}>
                                            {name}
                                        </p>
                                        <p className={'text-sm mb-5'}>{pos} -- {duration}</p>
                                        <p className={'group-hover:text-white transition ease-in-out duration-500'}>{title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Experience
