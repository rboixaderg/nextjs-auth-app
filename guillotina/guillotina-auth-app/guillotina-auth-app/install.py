# -*- coding: utf-8 -*-
from guillotina import configure
from guillotina.addons import Addon
from guillotina.utils import get_registry


@configure.addon(
    name="guillotina-auth-app",
    title="Simple guillotina app to login an user")
class ManageAddon(Addon):

    @classmethod
    async def install(cls, container, request):
        registry = await get_registry(container)  # noqa
        # install logic here...

    @classmethod
    async def uninstall(cls, container, request):
        registry = await get_registry(container)  # noqa
        # uninstall logic here...
