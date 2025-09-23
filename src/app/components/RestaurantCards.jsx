import Image from "next/image"

export default function RestaurantCards() {
    return (
        <section className=" h-full" >
            <h2 className="text-4xl pt-10 pb-8">Restaurant`s</h2>
            <div className=" flex w-full gap-4 flex-wrap">
                <div className="flex flex-col justify-between card-style restaurant-card">
                    <div className="flex gap-2">
                        <p className="info-tags">Status</p>
                        <p className="info-tags">time</p>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Restaurant Name</h3>
                        <button>
                            <Image
                                src="/img/button-arrow-green.png"
                                alt="Heart Icon"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between card-style restaurant-card">
                    <div className="flex gap-2">
                        <p className="info-tags">Status</p>
                        <p className="info-tags">time</p>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Restaurant Name</h3>
                        <button>
                            <Image
                                src="/img/button-arrow-green.png"
                                alt="Heart Icon"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between card-style restaurant-card">
                    <div className="flex gap-2">
                        <p className="info-tags">Status</p>
                        <p className="info-tags">time</p>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Restaurant Name</h3>
                        <button>
                            <Image
                                src="/img/button-arrow-green.png"
                                alt="Heart Icon"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between card-style restaurant-card">
                    <div className="flex gap-2">
                        <p className="info-tags">Status</p>
                        <p className="info-tags">time</p>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Restaurant Name</h3>
                        <button>
                            <Image
                                src="/img/button-arrow-green.png"
                                alt="Heart Icon"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between card-style restaurant-card">
                    <div className="flex gap-2">
                        <p className="info-tags">Status</p>
                        <p className="info-tags">time</p>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Restaurant Name</h3>
                        <button>
                            <Image
                                src="/img/button-arrow-green.png"
                                alt="Heart Icon"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between card-style restaurant-card">
                    <div className="flex gap-2">
                        <p className="info-tags">Status</p>
                        <p className="info-tags">time</p>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Restaurant Name</h3>
                        <button>
                            <Image
                                src="/img/button-arrow-green.png"
                                alt="Heart Icon"
                                width={32}
                                height={32}
                            />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}