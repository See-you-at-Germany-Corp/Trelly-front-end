


const RightDropdown = ({ value, options, placeholder = "Select", onChange }) => {
    const ref = useRef();
    const [isSearch, setSearch] = useState(false);
    const [isOpen, setOpen] =useContext(OpenContext);
    // const [isROpen,setROpen] = useState(false);
    const inputRef = useRef();
    const [isType, setType] = useState(false);

    // const [open, setOpen] = useState(false);

    const handleClickOutside = e => {
        console.log("clicking anywhere");
        if (ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen({type:''});
    };

    const handleChange = selectedValue => {
        onChange(selectedValue);
        setOpen({type:''});
    };

    useEffect(() => {
        if (isOpen.right) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen.right]);

    return (
        <Column
        animate={isOpen.right? "open":"closed"}
        variants={visibility}
        ref={ref} 
        align="flex-end"
        padding="4px"
        maxWidth="148px"
        >
            <Row align="flex-start" minHeight="32px">
                
                    <MyButton onClick={() => { setOpen({type:'right'}); setType('create') }}>
                        <AddIcon />
                    </MyButton>
                    <MyButton onClick={() => { setOpen({type:'right'}); setType('info') }}>
                        <InfoOutlinedIcon />
                    </MyButton>
                    <MyButton onClick={() => { setOpen({type:'right'}); setType('noti') }}>
                        <NotificationsNoneRoundedIcon />
                    </MyButton>
                
                    <motion.button style={{ outline: "none", border: "none", backgroundColor: "transparent", margin: "auto", padding: "0px" }}
                        onClick={() => { setOpen({type:'right'}); setType('user') }}
                    >
                        <Avatar style={{ width: "32px", height: "32px", margin: "auto" }} />
                    </motion.button>
            </Row>
            <div>
                <DropDownStyle
                    animate={isOpen.right ? 'open' : 'closed'}
                    variants={DropDownVariants}
                >
                    {getDropDown(isType)}
                </DropDownStyle>

                {/* <Card elevation={3} style={{width:"240px",height:"200px", color:"white",marginTop:"5px"}}/> */}
            </div>
            {/* {showRightDropDown(isROpen,isType)} */}
        </Column>
    );
};


const LeftDropdown = ({ value, options, placeholder = "Select", onChange }) => {
    const ref = useRef();
    const [isOpen, setOpen] = useContext(OpenContext);
    const [isType, setType] = useState(false);

    const handleClickOutside = e => {
        console.log("clicking anywhere");
        if (ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen({type:''});
    };

    const handleChange = selectedValue => {
        onChange(selectedValue);
        setOpen(({type:''}));
    };

    useEffect(() => {
        if (isOpen.left) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen.left]);

    return (
        <Column
        animate={isOpen.left? "open":"closed"}
        variants={visibility}
        ref={ref} 
        align="flex-start"
        minWidth="156px"
        maxWidth="156px"
        padding="4px"
        >
            <Row align="flex-start" minHeight="32px">
                <MyButton onClick={() => {setOpen({type:'left'}); setType('smth')}}>
                    <AppsIcon />
                </MyButton>
                <MyButton>
                    <HomeOutlinedIcon />
                </MyButton>
                <MyButton nomargin onClick={() => setOpen({type:'left'})}>
                    <DashboardOutlinedIcon />
                    Boards
                </MyButton>
            </Row>
            <div>
                <DropDownStyle
                    animate={isOpen.left ? 'open' : 'closed'}
                    variants={DropDownVariants}
                >
                    {getDropDown(isType)}
                </DropDownStyle>
            </div>
        </Column>
    );
};

const Search = ({ value, options, placeholder = "Select", onChange}) => {
    const ref = useRef();
    const [isSearch, setSearch] = useState(false);
    const [isOpen, setOpen] = useContext(OpenContext);
    // const [isROpen,setROpen] = useState(false);
    const inputRef = useRef();
    const [isType, setType] = useState(false);

    // const [open, setOpen] = useState(false);

    const handleClickOutside = e => {
        console.log("clicking anywhere");
        if (ref.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setOpen({type:''});
    };

    const handleChange = selectedValue => {
        onChange(selectedValue);
        setOpen({type:''});
    };

    useEffect(() => {
        if (isOpen.search) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen.search]);

    return (
        <Column
            animate={isOpen.search ? 'open':'closed'}
            variants={visibility}
            ref={ref} 
            align="flex-start"
            minWidth="140px"
            maxWidth={isOpen.search ? '240px' : '140px'}
            padding="4px 0px 4px 0px">
                    <Row
                        minHeight="32px"
                        maxHeight="32px"
                        animate={isOpen.search ? { backgroundColor: "white" } : { backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    >
                        <div onClick={() => { setOpen({type:'search'}); inputRef.current.focus(); setType('search') }} style={{ height: "32px", padding: "8px", boxSizing: "border-box", display: "flex", justifyContent: "center" }} >
                            <motion.input
                                animate={isOpen.search ? "open" : "closed"}
                                variants={variants}
                                onFocus={() => setOpen({type:'search'})}
                                ref={inputRef}
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    alignSelf: "flex-start",
                                    // height:"100%",
                                    padding: "0px",
                                    width: "130px"
                                    // height:"32px"
                                }}
                            >
                            </motion.input>
                        </div>
                        <div >
                            {
                                isOpen.search ?
                                    <CloseIcon style={{ height: "100%", color: "black" }} onClick={() => { setOpen({type:''}); inputRef.current.blur() }} /> :
                                    <SearchIcon style={{ height: "100%", color: "white" }} onClick={() => inputRef.current.focus()} />

                            }
                        </div>
                    </Row>
            <div>
                <DropDownStyle
                    animate={isOpen ? 'open' : 'closed'}
                    variants={DropDownVariants}
                >
                    {getDropDown(isType)}
                </DropDownStyle>

                {/* <Card elevation={3} style={{width:"240px",height:"200px", color:"white",marginTop:"5px"}}/> */}
            </div>
            
        </Column>
    );
};