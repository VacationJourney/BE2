SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c

ifneq ("$(wildcard .env)","")
	include .env
	export
endif

# =================================================================
# = Utility targets ===============================================
# =================================================================
NO_COLOR		:= \x1b[0m
OK_COLOR		:= \x1b[32;01m
ERROR_COLOR	:= \x1b[31;01m
WARN_COLOR	:= \x1b[33;01m

# ===================================================================================================
# Allows a target to require environment variables to exist
# Example that will only run 'mytarget' when the environment variable named 'SERVER' has been set:
#  mytarget: env-SERVER another-dependency
# ===================================================================================================
env-%:
	@if [ "${${*}}" = "" ]; then \
		printf "$(ERROR_COLOR)"; \
		echo "**** ERROR: Required environment variable $* not set ****"; \
		printf "$(NO_COLOR)"; \
		echo; \
		exit 1; \
	fi

docker-clean: clean
	@printf "$(OK_COLOR)"																																												&& \
	 printf "\n%s\n" "======================================================================================"		&& \
	 printf "%s\n"   "= Deep cleaning your Docker environment"																									&& \
	 printf "%s\n"   "======================================================================================"		&& \
	 printf "$(NO_COLOR)"
	-docker container stop $$(docker container ls -aq)
	-docker container rm $$(docker container ls -aq)
	-docker system prune -f