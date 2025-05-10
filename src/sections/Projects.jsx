import {myProjects} from "../constants/index.js";
import {Suspense, useEffect, useState} from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {Center, OrbitControls, PerformanceMonitor} from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader.jsx";
import DemoComputer from "../components/DemoComputer.jsx";
import Developer from "../components/Developer.jsx";
import round from "lodash/round.js";

const Projects = ({isMobile}) => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const currentProject = myProjects[selectedProjectIndex];
    const projectCount = myProjects.length;
    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    }


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
        <section id={'work'} className={'c-space my-20'}>
            <p className={'head-text'}>My Work</p>
            <div className={'grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full'}>
                <div className={'flex flex-col gap-5 relative sm:p-10 py-10 px-6 shadow-2xl shadow-black-200'}>
                    <div className={'absolute top-0 right-0'}>
                        <img src={currentProject.spotlight} alt={'spotlight'}
                             className={'rounded-xl w-full h-96 object-cover'}/>
                    </div>
                    <div className={'p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg'}
                         style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt={'logo'} className={'w-10 h-10 shadow-sm'}/>
                    </div>
                    <div className={'flex flex-col gap-5 my-5 text-white-600'}>
                        <p className={'text-white font-semibold text-2xl animatedText'}>{currentProject.title}</p>
                        <p className={'animatedText'}>{currentProject.desc}</p>
                        <p className={'animatedText'}>{currentProject.subdesc}</p>
                    </div>
                    <div className={'flex items-center justify-between flex-wrap gap-5'}>
                        <div className={'flex items-center gap-3'}>
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className={'tech-logo'}>
                                    <img src={tag.path} alt={tag.name}/>
                                </div>
                            ))}
                        </div>
                        <a className={'flex items-center gap-2 cursor-pointer text-white-600'}
                           href={currentProject.href} target={'_blank'} rel={'noreferrer'}>
                            <p>Check Live Site</p>
                            <img src={'/assets/arrow-up.png'} className={'w-3 h-3'} alt={'arrow'}/>
                        </a>
                    </div>
                    <div className={'flex justify-between items-center mt-7'}>
                        <button className={'arrow-btn'} onClick={() => {
                            handleNavigation('previous')
                        }}>
                            <img src={'/assets/left-arrow.png'} alt={'left-arrow'} className={'w-4 h-4'}/>
                        </button>
                        <button className={'arrow-btn'} onClick={() => {
                            handleNavigation('next')
                        }}>
                            <img src={'/assets/right-arrow.png'} alt={'right-arrow'} className={'w-4 h-4'}/>
                        </button>
                    </div>
                </div>
                <div className={'border border-black-300 bg-black-200 rounded-lg h-96 md:h-full hidden md:block'}>
                    {isMobile ? UnloadModels() : (
                        <Canvas frameloop={isMobile ? 'demand' : 'always'} dpr={dpr}>
                            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}
                                                onChange={({factor}) => setDpr(round(0.5 + 1.5 * factor, 1))}>
                                <ambientLight intensity={Math.PI}/>
                                <directionalLight position={[10, 10, 5]} intensity={1}/>
                                <Center>
                                    <Suspense fallback={<CanvasLoader/>}>
                                        <AdaptivePixelRatio pixelRatio={Math.min(window.devicePixelRatio, 2)}/>
                                        <group scale={2} position={[0, -3, 0]} rotation={[0, 0, 0]}>
                                            <DemoComputer texture={currentProject.texture}/>
                                        </group>
                                    </Suspense>
                                </Center>
                                <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}/>
                            </PerformanceMonitor>
                        </Canvas>
                    )}
                </div>
            </div>
        </section>
    )
}
export default Projects
