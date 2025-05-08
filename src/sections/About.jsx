import Globe from "react-globe.gl";
import Button from "../components/Button.jsx";
import {useState} from "react";

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText('mostafa.fexh.business@gmail.com');
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false)
        }, 2000);
    }
    return (
        <section className={'c-space my-20'} id={'about'}>
            <div className={'grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'}>
                <div className={'col-span-1 xl:row-span-3'}>
                    <div className={'grid-container'}>
                        <img src={'/assets/grid1.png'} alt={'Grid-1'}
                             className={'w-full sm:h-[276px] h-fit object-contain'}/>
                        <div className={''}>
                            <p className={'grid-headtext'}>Hi, I&#39;m Mostafa Yaser</p>
                            <p className={'grid-subtext'}>With 12 Years of experience, I have honed my skills in
                                frontend and backend development, with a strong focus on animated 3D websites.</p>
                        </div>
                    </div>
                </div>
                <div className={'col-span-1 xl:row-span-3'}>
                    <div className={'grid-container'}>
                        <img src={'/assets/grid2.png'} alt={'Grid-2'}
                             className={'w-full sm:h-[276px] h-fit object-contain'}/>
                        <div>
                            <p className={'grid-headtext'}> Tech Stack</p>
                            <p className={'grid-subtext'}>I specialize in Javascript/Typescript with a focus On React
                                and Next.js ecosystems.</p>
                        </div>
                    </div>
                </div>
                <div className={'col-span-1 xl:row-span-4'}>
                    <div className={'grid-container'}>
                        <div className={'rounded-3xl w-full sm:h-[326px] h-fit flex items-center justify-center'}>
                            <Globe
                                initialCameraDistanceRadiusScale={15}
                                initialCoordinates={[29.7604, 95.3698]}
                                width={386}
                                height={386}
                                backgroundColor={"rgba(0,0,0,0)"}
                                backgroundImageOpacity={0.5}
                                showAtmosphere={true}
                                showGraticules={true}
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{
                                    lat: 30.8,
                                    lng: 31.3,
                                    text: "I'm here!",
                                    color: "white",
                                    size: 50,
                                }]}
                                options={{
                                    focusAnimationDuration: 3000,
                                    focusDistanceRadiusScale: 2,
                                    focusEasingFunction: ['Elastic', 'In'],
                                }}
                            />
                        </div>
                        <div>
                            <p className={'grid-headtext'}>I work remotely across most timezones.</p>
                            <p className={'grid-headtext'}>I&#39;m based in Egypt, with remote work available.</p>
                            <Button name={'Contact Me'} isBeam containerClass={'w-full mt-10'}/>
                        </div>
                    </div>
                </div>
                <div className={'xl:col-span-2 xl:row-span-3'}>
                    <div className={'grid-container'}>
                        <img src={'/assets/grid3.png'} alt={'Grid-3'}
                             className={'w-full sm:h-[266px] h-fit object-contain'}/>
                        <div>
                            <p className={'grid-headtext'}>My Passion For Coding</p>
                            <p className={'grid-subtext'}>I Love Solving Problems and building things throw code. Coding
                                isn&#39;t just my profession - it is my passion.</p>
                        </div>
                    </div>
                </div>
                <div className={'xl:col-span-1 xl:row-span-2'}>
                    <div className={'grid-container'}>
                        <img src={'/assets/grid4.png'} alt={'Grid-4'}
                             className={'w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top'}/>
                        <div className={'space-y-2'}>
                            <p className={'grid-subtext'}>Contact Me</p>
                            <div className={'copy-container text-center'} onClick={handleCopy}>
                                <img src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'} alt={'copy'}/>
                                <p className={'lg:text-2xl md:text-xl font-medium text-gray_gradient text-white'}>mostafa.fexh@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About
